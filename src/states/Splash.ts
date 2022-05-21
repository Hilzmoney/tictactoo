import { TicTacToeGame } from "../TicTacToeGame"
import { TicTacToeState } from '../TicTacToeState';

const ticTacToeAsciiArt: string[] = [
    " ▄▄▄▄▄▄▄ ▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ",
    "█       █   █       █       █      █       █       █       █       █",
    "█▄     ▄█   █       █▄     ▄█  ▄   █       █▄     ▄█   ▄   █    ▄▄▄█",
    "  █   █ █   █     ▄▄█ █   █ █ █▄█  █     ▄▄█ █   █ █  █ █  █   █▄▄▄ ",
    "  █   █ █   █    █    █   █ █      █    █    █   █ █  █▄█  █    ▄▄▄█",
    "  █   █ █   █    █▄▄  █   █ █  ▄   █    █▄▄  █   █ █       █   █▄▄▄ ",
    "  █▄▄▄█ █▄▄▄█▄▄▄▄▄▄▄█ █▄▄▄█ █▄█ █▄▄█▄▄▄▄▄▄▄█ █▄▄▄█ █▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█",
    "                                                       by majo418   ",
]

const welcomeText: string[] = [
    "       ___                                                ___       ",
    "      (o o)                                              (o o)      ",
    "     (  V  )                  welcome                   (  V  )     ",
    "-------m-m------------------------------------------------m-m-------",
]

export class SplashState implements TicTacToeState {
    onEnable(game: TicTacToeGame): Promise<void> | void {
        game.clear()
        ticTacToeAsciiArt.forEach(line => console.info(line))
        welcomeText.forEach(line => console.info(line))
        console.info("Splash | Press 'enter' to start the game.")
        game.handleInput()
    }

    selectField(game: TicTacToeGame, row: number, col: number): Promise<void> | void {
        console.info("Splash | That was not 'enter'!")
        console.info("Splash | Press 'enter' to start the game...")
        game.handleInput()
    }

    exit(game: TicTacToeGame): Promise<void> | void {
        console.info("Splash | Exit game...")
        process.exit(0)
    }

    restart(game: TicTacToeGame): Promise<void> | void {
        console.info("Splash | You cannot restart if the game is not started!")
        console.info("Splash | Press 'enter' to start the game.")
        game.handleInput()
    }

    surrender(game: TicTacToeGame): Promise<void> | void {
        console.info("You cannot surrender if the game is not started!")
        console.info("Splash | Press 'enter' to start the game.")
        game.handleInput()
    }

    enter(game: TicTacToeGame): Promise<void> | void {
        game.setState(TicTacToeGame.turnXState)
    }
}