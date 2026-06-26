from PIL import Image

img = Image.open('static/img/q_logo_transparent.png')
img_rgba = img.convert('RGBA')
width, height = img_rgba.size

# We want to find the dominant color of the non-transparent blue pixels
color_counts = {}

for x in range(width):
    for y in range(height):
        r, g, b, a = img_rgba.getpixel((x, y))
        if a > 150: # reasonably solid pixel
            # Check if it's primarily blue (Blue is the highest component)
            if b > r and b > g and b > 100:
                color_key = (r, g, b)
                color_counts[color_key] = color_counts.get(color_key, 0) + 1

# Sort by count
sorted_colors = sorted(color_counts.items(), key=lambda x: x[1], reverse=True)

# Print the top 5 dominant colors
for i in range(min(5, len(sorted_colors))):
    color, count = sorted_colors[i]
    print(f"Color: {color} (Hex: #{color[0]:02x}{color[1]:02x}{color[2]:02x}) - Count: {count}")
