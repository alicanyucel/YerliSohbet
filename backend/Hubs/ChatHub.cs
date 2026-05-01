using Microsoft.AspNetCore.SignalR;

namespace Chat.Api.Hubs;

public sealed class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        if (string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(message))
        {
            return;
        }

        await Clients.All.SendAsync("ReceiveMessage", user.Trim(), message.Trim(), DateTimeOffset.UtcNow);
    }
}
