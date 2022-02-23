import { TicTacToeGame, TicTacToeState } from "../TicTacToeGame"
import { prompt } from "../prompt"

const ticTacToeAsciiArt: string[] = [
    " ▄▄▄▄▄▄▄ ▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ",
    "█       █   █       █       █      █       █       █       █       █",
    "█▄     ▄█   █       █▄     ▄█  ▄   █       █▄     ▄█   ▄   █    ▄▄▄█",
    "  █   █ █   █     ▄▄█ █   █ █ █▄█  █     ▄▄█ █   █ █  █ █  █   █▄▄▄ ",
    "  █   █ █   █    █    █   █ █      █    █    █   █ █  █▄█  █    ▄▄▄█",
    "  █   █ █   █    █▄▄  █   █ █  ▄   █    █▄▄  █   █ █       █   █▄▄▄ ",
    "  █▄▄▄█ █▄▄▄█▄▄▄▄▄▄▄█ █▄▄▄█ █▄█ █▄▄█▄▄▄▄▄▄▄█ █▄▄▄█ █▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█",
]

const welcomeText: string[] = [
    "  ___             ___  ",
    " (o o)           (o o) ",
    "(  V  ) welcome (  V  )",
    "--m-m-------------m-m--",
];


export class SplashState implements TicTacToeState {
    printStartScreen() {
        ticTacToeAsciiArt.forEach(line => console.log(line))
        welcomeText.forEach(line => console.log(line))
    }

    handleTurnX(game: TicTacToeGame): void {
        throw new Error("Game is not started")
    }

    handleTurnO(game: TicTacToeGame): void {
        throw new Error("Game is not started")
    }

    handleEnd(game: TicTacToeGame): void {
        throw new Error("Game is not started")
    }

    async handleSplash(game: TicTacToeGame): Promise<void> {
        this.printStartScreen()
        const input = await prompt("TicTacToe| Press enter key to start the game (enter 'quit' to exit)")
        if (input.toLowerCase().includes("quit")) {
            process.exit(0)
        }
        game.setState(TicTacToeGame.turnXState)
        game.handleTurnX()
    }
}