import { SplashState } from "./states/Splash"
import { EndState } from "./states/End"
import { TurnOState } from "./states/TurnO"
import { TurnXState } from "./states/TurnX"
import { prompt } from "./prompt"
import { TicTacToeState } from './TicTacToeState';

export type PlayerValue = "X" | "O"
export type FieldValue = PlayerValue | " "

export type TicTacToeLine = [number, number, number]
export const ticTacToeLines: TicTacToeLine[] = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
]

export class TicTacToeGame {
    public static readonly splashState: SplashState = new SplashState()
    public static readonly endState: EndState = new EndState()
    public static readonly turnOState: TurnOState = new TurnOState()
    public static readonly turnXState: TurnXState = new TurnXState()

    private exitMessages: string[] = ["exit", "quit", "close"]
    private restartMessages: string[] = ["restart", "renew", "play again"]
    private surrenderMessages: string[] = ["surrender", "give up"]
    private winner: PlayerValue | undefined = undefined
    private state: TicTacToeState = TicTacToeGame.splashState
    private readonly board: FieldValue[] = [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " ",
    ]

    // TickTacToe methods
    clear(): void {
        this.board.fill(" ")
        this.winner = undefined
    }

    setWinner(player: PlayerValue): void {
        this.winner = player
    }

    setField(x: number, y: number, value: FieldValue): void {
        this.board[y * 3 + x] = value
    }

    getField(x: number, y: number): FieldValue {
        return this.board[y * 3 + x]
    }

    printFields(): void {
        console.log("  | r1| r2| r3|")
        console.log("--+---+---+---+")
        console.log("c1| " + this.board[0] + " | " + this.board[1] + " | " + this.board[2] + " |")
        console.log("--+---+---+---+")
        console.log("c2| " + this.board[3] + " | " + this.board[4] + " | " + this.board[5] + " |")
        console.log("--+---+---+---+")
        console.log("c3| " + this.board[6] + " | " + this.board[7] + " | " + this.board[8] + " |")
        console.log("--+---+---+---+")
    }

    isOver(): boolean {
        return this.getWinner() != undefined ||
            this.board.every(field => field !== " ")
    }

    isFull(): boolean {
        return this.board.every(field => field !== " ")
    }

    getWinner(): PlayerValue | undefined {
        if (!this.winner) {
            for (const line of ticTacToeLines) {
                const [x, y, z] = line
                if (
                    this.board[x] !== " " &&
                    this.board[x] === this.board[y] &&
                    this.board[x] === this.board[z]
                ) {
                    this.winner = this.board[x] as PlayerValue
                }
            }
        }
        return this.winner
    }

    start(): void {
        this.clear()
        this.setState(TicTacToeGame.splashState)
    }

    // StateMachine methods
    async setState(state: TicTacToeState): Promise<void> {
        this.state = state
        await this.state.onEnable(this)
    }

    async selectField(row: number, col: number): Promise<void> {
        await this.state.selectField(this, row, col)
    }

    async exit(): Promise<void> {
        await this.state.exit(this)
    }

    async restart(): Promise<void> {
        await this.state.restart(this)
    }

    async surrender(): Promise<void> {
        await this.state.surrender(this)
    }

    async enter(): Promise<void> {
        await this.state.enter(this)
    }

    async handleInput() {
        while (true) {
            const input = await prompt()
            if (input.length == 0) {
                await this.enter()
                return
            } else if (this.exitMessages.includes(input.toLowerCase())) {
                await this.exit()
                return
            } else if (this.restartMessages.includes(input.toLowerCase())) {
                await this.restart()
                return
            } else if (this.surrenderMessages.includes(input.toLowerCase())) {
                await this.surrender()
                return
            } else {
                let splitBy: string = ""
                if (input.includes(", ")) {
                    splitBy = ", "
                } else if (input.includes(" ")) {
                    splitBy = " "
                } else if (input.includes(",")) {
                    splitBy = ","
                }
                if (splitBy.length != 0) {
                    const splitted = input.split(splitBy)
                    if (splitted.length == 2) {
                        let row: number = Number(splitted[0])
                        let col: number = Number(splitted[1])
                        if (row < 1 || row > 3) {
                            console.error("Row and column must be between 1 and 3")
                            continue
                        }
                        await this.selectField(row - 1, col - 1)
                        return
                    }
                }
                console.log("Unknown input!\nPlease enter 'exit', 'restart', 'surrender' or the row and column numbers seperated by ','.")
            }
        }
    }
}
