defmodule MemoryWeb.GameChannel do
    use MemoryWeb, :channel

    alias Memory.Game

    def join("game:" <> name, payload, socket) do
        if authorized?(payload) do
            game = Game.new()
            socket = socket
            |> assign(:game, game)
            |> assign(:name, name)
            {:ok, %{"join" => name, "state"=> Game.client_view(game)}, socket}
        else
            {:error, %{"reason" => "unauthorized"}}
        end
    end

    def handle_in("display_value", %{"index" => index}, socket) do
        game = Game.display_value(socket.assigns[:game], index)
        socket = assign(socket, :game, game)
        {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
    end

    def handle_in("check_match", %{"index" => index}, socket) do
        game = Game.check_match(socket.assigns[:game], index)
        socket = assign(socket, :game, game)
        {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
    end

    def handle_in("reset", _payload, socket) do
        game = Game.new()
        socket = assign(socket, :game, game)
        {:reply, {:ok, %{"state" => Game.client_view(game)}}, socket}
    end


    def authorized?(_payload) do
        true
    end
end