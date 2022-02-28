import { TicTacToeGame } from './TicTacToeGame';

export interface TicTacToeState {
    onEnable(gmae: TicTacToeGame): Promise<void> | void
    selectField(game: TicTacToeGame, row: number, col: number): Promise<void> | void
    exit(game: TicTacToeGame): Promise<void> | void
    restart(game: TicTacToeGame): Promise<void> | void
    surrender(game: TicTacToeGame): Promise<void> | void
    enter(game: TicTacToeGame): Promise<void> | void
}