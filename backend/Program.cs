using Chat.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("chat-cors", corsBuilder =>
    {
        corsBuilder
            .SetIsOriginAllowed(_ => true)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseRouting();
app.UseCors("chat-cors");

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapHub<ChatHub>("/hubs/chat");

app.Run();
