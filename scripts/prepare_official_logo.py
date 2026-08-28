"""تنظيف خلفية الشعار الأبيض وإنشاء PNG شفاف مضغوط للموقع."""
from pathlib import Path
from PIL import Image

input_path = Path("/home/ubuntu/webdev-static-assets/soudad-official-logo.png")
output_path = Path("/home/ubuntu/webdev-static-assets/soudad-official-logo-transparent.png")

image = Image.open(input_path).convert("RGBA")
pixels = image.load()
for y in range(image.height):
    for x in range(image.width):
        red, green, blue, alpha = pixels[x, y]
        whiteness = min(red, green, blue)
        if whiteness >= 242:
            pixels[x, y] = (red, green, blue, 0)
        elif whiteness >= 220:
            new_alpha = int((242 - whiteness) / 22 * alpha)
            pixels[x, y] = (red, green, blue, new_alpha)

alpha_channel = image.getchannel("A")
bounds = alpha_channel.getbbox()
if bounds:
    image = image.crop(bounds)
image.save(output_path, "PNG", optimize=True)
print(output_path)
