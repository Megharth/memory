defmodule Memory.Game do
    def new do
        squares = [65, 65, 66, 66, 67, 67, 68, 68, 69, 69, 70, 70, 71, 71, 72, 72]
        %{
            squares: Enum.shuffle(squares),
            squareVal: Enum.map(squares, fn el -> nil end),
            val: nil,
            prevBlockIndex: nil,
            goodGuess: 0,
            badGuess: 0,
            score: 100,
            disabled: false
        }
    end

    def client_view(game) do
        game
    end

    def display_value(game, index) do
        squareVal = game.squareVal
        if Enum.at(squareVal, index) == nil do
            val = Enum.at(game.squares, index)
            updatedSquareVal = List.update_at(squareVal, index, &(&1 = val))
            Map.merge(game, %{squareVal: updatedSquareVal})
        end 
    end

    def check_match(game, index) do
        val = Enum.at(game.squares, index)
        if game.val != nil do
            if val == game.val do
                goodGuess = game.goodGuess + 1
                score = game.score + 10
                Map.merge(game, %{goodGuess: goodGuess, score: score, val: nil, prevBlockIndex: nil})
            else
                badGuess = game.badGuess + 1
                score = game.score - 5
                updatedSquareVal = List.update_at(game.squareVal, index, &(&1 = nil))
                finalSquareVal = List.update_at(updatedSquareVal, game.prevBlockIndex, &(&1 = nil))
                Map.merge(game, %{badGuess: badGuess, score: score, squareVal: finalSquareVal, prevBlockIndex: nil, disabled: false, val: nil})
            end
        else
            Map.merge(game, %{val: val, prevBlockIndex: index})
        end
    end
end