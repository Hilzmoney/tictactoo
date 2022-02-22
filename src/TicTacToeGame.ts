import { SplashState } from "./states/Splash"
import { EndState } from "./states/End"
import { TurnOState } from "./states/TurnO"
import { TurnXState } from "./states/TurnX"

export interface TicTacToeState {
    handleTurnX(game: TicTacToeGame): Promise<void> | void
    handleTurnO(game: TicTacToeGame): Promise<void> | void
    handleEnd(game: TicTacToeGame): Promise<void> | void
    handleSplash(game: TicTacToeGame): Promise<void> | void
}

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

    private state: TicTacToeState = TicTacToeGame.splashState
    private readonly board: FieldValue[] = [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " "
    ]

    // TickTacToe methods
    clear(): void {
        this.board.fill(" ")
    }

    setField(x: number, y: number, value: FieldValue): void {
        this.board[y * 3 + x] = value
    }

    getField(x: number, y: number): FieldValue {
        return this.board[y * 3 + x]
    }

    printFields(): void {
        console.log("   r1 | r2 | r3 ")
        console.log("  +---+---+---+")
        console.log("c1| " + this.board[0] + " | " + this.board[1] + " | " + this.board[2] + " |")
        console.log("  +---+---+---+")
        console.log("c2| " + this.board[3] + " | " + this.board[4] + " | " + this.board[5] + " |")
        console.log("  +---+---+---+")
        console.log("c3| " + this.board[6] + " | " + this.board[7] + " | " + this.board[8] + " |")
        console.log("  +---+---+---+")
    }

    isOver(): boolean {
        return this.getWinner() != undefined ||
            this.board.every(field => field !== " ")
    }

    isFull(): boolean {
        return this.board.every(field => field !== " ")
    }

    getWinner(): PlayerValue | undefined {
        for (const line of ticTacToeLines) {
            const [x, y, z] = line
            if (
                this.board[x] !== " " &&
                this.board[x] === this.board[y] &&
                this.board[x] === this.board[z]
            ) {
                return this.board[x] as PlayerValue
            }
        }
        return undefined
    }

    // StateMachine methods
    async setState(state: TicTacToeState): Promise<void> {
        this.state = state
    }

    async handleTurnX(): Promise<void> {
        await this.state.handleTurnX(this)
    }

    async handleTurnO(): Promise<void> {
        await this.state.handleTurnO(this)
    }

    async handleEnd(): Promise<void> {
        await this.state.handleEnd(this)
    }

    async handleSplash(): Promise<void> {
        await this.state.handleSplash(this)
    }
}
