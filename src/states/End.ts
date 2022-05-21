import { TicTacToeGame } from '../TicTacToeGame';
import { TicTacToeState } from '../TicTacToeState';

const theWinnerIsAsciiArt: string[] = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "━┏┓━┏┓━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "┏┛┗┓┃┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "┗┓┏┛┃┗━┓┏━━┓━━┏┓┏┓┏┓┏┓┏━┓━┏━┓━┏━━┓┏━┓━━┏┓┏━━┓━",
    "━┃┃━┃┏┓┃┃┏┓┃━━┃┗┛┗┛┃┣┫┃┏┓┓┃┏┓┓┃┏┓┃┃┏┛━━┣┫┃━━┫━",
    "━┃┗┓┃┃┃┃┃┃━┫━━┗┓┏┓┏┛┃┃┃┃┃┃┃┃┃┃┃┃━┫┃┃━━━┃┃┣━━┃━",
    "━┗━┛┗┛┗┛┗━━┛━━━┗┛┗┛━┗┛┗┛┗┛┗┛┗┛┗━━┛┗┛━━━┗┛┗━━┛━",
]

const playerXWonAsciiArt = [
    "━┏┓━━━━━━━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┏┓━",
    "━┃┃━━━━━━━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┃┃━",
    "━┃┃━━━━┏━━┓┃┃━┏━━┓━┏┓━┏┓┏━━┓┏━┓━━━━┏┓┏┓━━━━┃┃━",
    "━┗┛━━━━┃┏┓┃┃┃━┗━┓┃━┃┃━┃┃┃┏┓┃┃┏┛━━━━┗╋╋┛━━━━┗┛━",
    "━┏┓━━━━┃┗┛┃┃┗┓┃┗┛┗┓┃┗━┛┃┃┃━┫┃┃━━━━━┏╋╋┓━━━━┏┓━",
    "━┗┛━━━━┃┏━┛┗━┛┗━━━┛┗━┓┏┛┗━━┛┗┛━━━━━┗┛┗┛━━━━┗┛━",
    "━━━━━━━┃┃━━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━",
    "━━━━━━━┗┛━━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━",
]

const playerYWonAsciiArt = [
    "━┏┓━━━━━━━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┏┓━",
    "━┃┃━━━━━━━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┃┃━",
    "━┃┃━━━━┏━━┓┃┃━┏━━┓━┏┓━┏┓┏━━┓┏━┓━━━━┏━━┓━━━━┃┃━",
    "━┗┛━━━━┃┏┓┃┃┃━┗━┓┃━┃┃━┃┃┃┏┓┃┃┏┛━━━━┃┏┓┃━━━━┗┛━",
    "━┏┓━━━━┃┗┛┃┃┗┓┃┗┛┗┓┃┗━┛┃┃┃━┫┃┃━━━━━┃┗┛┃━━━━┏┓━",
    "━┗┛━━━━┃┏━┛┗━┛┗━━━┛┗━┓┏┛┗━━┛┗┛━━━━━┗━━┛━━━━┗┛━",
    "━━━━━━━┃┃━━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━",
    "━━━━━━━┗┛━━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━",
]

const tieAsciiArt = [
    "      //// // ///////  ",
    "     //// // ///////   ",
    "    TIE! No winner!    ",
    "   //// // ///////     ",
    "  //// // ///////      ",
]

export class EndState implements TicTacToeState {
    onEnable(game: TicTacToeGame): Promise<void> | void {
        game.printFields()
        const winner = game.getWinner()
        if (!winner) {
            if (game.isFull()) {
                console.info(tieAsciiArt.join("\n"))
            } else {
                throw new Error("Game end state but board is not full")
            }
        }
        if (winner === "X") {
            console.info(theWinnerIsAsciiArt.join("\n"))
            console.info(playerXWonAsciiArt.join("\n"))
        } else if (winner === "O") {
            console.info(theWinnerIsAsciiArt.join("\n"))
            console.info(playerYWonAsciiArt.join("\n"))
        }
        console.info("Press 'enter' to restart and 'exit' to exit the game.")
        game.handleInput()
    }

    selectField(game: TicTacToeGame, row: number, col: number): Promise<void> | void {
        console.info("That was not 'enter'!")
        console.info("Press 'enter' to continue...")
        game.handleInput()
    }

    exit(game: TicTacToeGame): Promise<void> | void {
        console.info("Exit game...")
        process.exit(0)
    }

    restart(game: TicTacToeGame): Promise<void> | void {
        game.setState(TicTacToeGame.splashState)
    }

    surrender(game: TicTacToeGame): Promise<void> | void {
        console.info("That was not 'enter'!")
        console.info("Press 'enter' to continue...")
        game.handleInput()
    }

    enter(game: TicTacToeGame): Promise<void> | void {
        game.setState(TicTacToeGame.splashState)
    }
}