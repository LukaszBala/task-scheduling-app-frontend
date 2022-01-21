export class ColorUtils {
    public static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
            : null;
    }

    public static isColorBright(color: string): boolean {
        const result = this.hexToRgb(color);
        if (!result) {
            return true;
        }
        const luminance = (0.299 * result.r + 0.541 * result.g + 0.16 * result.b) / 255;
        return luminance > 0.3;
    }
}
