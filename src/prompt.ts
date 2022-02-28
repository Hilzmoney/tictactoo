
let textBuffer: string = ""
let currentPromise: Promise<string> | undefined
export async function prompt(
    message?: string,
    clearBuffer: boolean = false,
    readStream: NodeJS.ReadStream = process.stdin,
    encoding: BufferEncoding = "utf8",
    timoutMillis: number = 1000 * 60 * 5,
    timeoutMessage: string = "Prompt input timeout!",
): Promise<string> {
    while (currentPromise) {
        await currentPromise
    }
    currentPromise = new Promise((res, rej) => {
        if (typeof message == "string") {
            console.log(message)
        }
        if (clearBuffer) {
            textBuffer = ""
        }
        const removeListener = () => {
            readStream.removeListener("data", onDate)
            readStream.removeListener("end", onEnd)
            clearTimeout(timeout)
        }
        let end: boolean = false
        const timeout = setTimeout(() => {
            if (end) {
                return
            }
            process.stdin.pause()
            end = true
            removeListener()
            rej(new Error(timeoutMessage))
        }, timoutMillis)
        const onDate = (data: Buffer) => {
            if (end) {
                return
            }
            textBuffer += data
            const index = textBuffer.indexOf("\n")
            if (index !== -1) {
                process.stdin.pause()
                const line = textBuffer.substring(0, index)
                textBuffer = textBuffer.substring(index + 1)
                end = true
                removeListener()
                res(line)
            }
        }
        const onEnd = () => {
            if (end) {
                return
            }
            end = true
            removeListener()
            res("")
        }

        readStream.setEncoding(encoding)
        readStream.resume()
        readStream.on('data', onDate)
        readStream.on('end', onEnd)
    })
    const value = await currentPromise
    currentPromise = undefined
    return value
}

// function prompt number
export async function promptNumber(
    message: string,
    errorMessage: string = "The value must be a number!",
): Promise<number> {
    while (true) {
        const value = Number(await prompt(message))
        if (isNaN(value)) {
            console.log(errorMessage)
        } else {
            return value
        }
    }
}

// function prompt number between
export async function promptNumberBetween(
    message: string,
    min: number,
    max: number,
    errorMessage: string = "The value must be a number between $MIN and $MAX!",
): Promise<number> {
    errorMessage = errorMessage.replace("$MIN", min.toString())
    errorMessage = errorMessage.replace("$MAX", max.toString())
    while (true) {
        const value = await promptNumber(message)
        if (value >= min && value <= max) {
            return value
        }
        console.log(errorMessage)
    }
}

// function prompt boolean (yes/no)
export async function promptBoolean(
    message: string,
    trueValues: string[] = ["yes", "y", "true", "t", "1", "on"],
    falseValues: string[] = ["no", "n", "false", "f", "0", "off"],
    errorMessage: string = "The value must be $TRUE or $FALSE!",
): Promise<boolean> {
    if (trueValues.length == 0) {
        throw new Error("trueValues must not be empty")
    }
    if (falseValues.length == 0) {
        throw new Error("falseValues must not be empty")
    }
    errorMessage = errorMessage.replace("$TRUE", trueValues[0])
    errorMessage = errorMessage.replace("$FALSE", falseValues[0])
    trueValues = trueValues.map(v => v.toLowerCase())
    falseValues = falseValues.map(v => v.toLowerCase())
    while (true) {
        const value = await prompt(message)
        if (trueValues.includes(value.toLowerCase())) {
            return true
        } else if (falseValues.includes(value.toLowerCase())) {
            return false
        }
        console.log(errorMessage)
    }
}
