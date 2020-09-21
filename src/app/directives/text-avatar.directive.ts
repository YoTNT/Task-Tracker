import { Input, SimpleChanges, Component } from "@angular/core";
import { ColorGenerator } from "./color-generator";

@Component({
  selector: "text-avatar",
  template: `
    <div class="u-text-avatar" [ngStyle]="styles">{{ firstLetter }}</div>
  `,
  styleUrls: ["./text-avatar.directive.scss"],
})
export class TextAvatarDirective {
  @Input() text: string;
  @Input() color: string;
  @Input() textColor: string;

  public firstLetter = "";
  public styles = {
    "background-color": "#fff",
    color: "#000",
  };

  constructor(private colorGenerator: ColorGenerator) {}

  ngOnChanges(changes: SimpleChanges) {
    let text = changes["text"] ? changes["text"].currentValue : null;
    let color = changes["color"] ? changes["color"].currentValue : null;
    let textColor = changes["textColor"]
      ? changes["textColor"].currentValue
      : this.styles.color;

    this.firstLetter = this.extractFirstCharacter(text);

    this.styles = {
      ...this.styles,
      "background-color": this.backgroundColorHexString(color, text),
      color: textColor,
    };
  }

  private extractFirstCharacter(text: string): string {
    // if (text) {
    //   return text.charAt(0) || "";
    // } else return " ";
    return this.getUppercase(text);
  }
  getUppercase(str): string {
    if (str) {
      let array1 = str.split(" ");
      let newarray1 = [];

      for (var x = 0; x < array1.length; x++) {
        if (x < 2) newarray1.push(array1[x].charAt(0).toUpperCase());
        else break;
      }
      return newarray1.join("");
    } else return "??";
  }
  private backgroundColorHexString(color: string, text: string): string {
    return color || this.colorGenerator.getColor(text);
  }
}
