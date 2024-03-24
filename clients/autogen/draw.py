def draw_chat(agent1, agent2, dialog):
    # Define the dimensions of the chat window
    width = 300
    height = 500

    # Create a new figure with the defined size
    fig = plt.figure(figsize=(width, height), frameon=False)

    # Add a subplot to the figure
    ax = fig.add_axes([0, 0, 1, 1])

    # Set the aspect ratio of the subplot to equal
    ax.set_aspect('equal')

    # Draw the background rectangle
    rect = mpl.patches.Rectangle((0, 0), 1, 1, fill=True, edgecolor='black', facecolor='gray')
    rect.set_alpha(0.5)
    ax.add_patch(rect)

    # Draw the chat messages
    for message in dialog:
        x = width - 25
        y = height - 25
        rect = mpl.patches.Rectangle((x, y), 25, 25, fill=True, edgecolor='black', facecolor=message["background_color"])
        rect.set_alpha(0.8)
        ax.add_patch(rect)

        text = message["text"]
        fontsize = message["fontsize"]
        x = x - mpl.rcParams['font.size'] / 2
        y = y - mpl.rcParams['font.size'] / 2
        ax.text(x, y, text, color=message["color"], fontsize=fontsize)

    # Display the plot
    plt.show()

# Example dialog
dialog = [
    {"text": "Agent 1: Hello!", "background_color": "green", "color": "white", "fontsize": 12},
    {"text": "Agent 2: Hi, how are you?", "background_color": "blue", "color": "white", "fontsize": 12},
    {"text": "Agent 1: I'm doing well, thank you!", "background_color": "green", "color": "black", "fontsize": 10},
    {"text": "Agent 2: That's great to hear!", "background_color": "blue", "color": "white", "fontsize": 12}
]

draw_chat(agent1, agent2, dialog)
