import { Injectable } from "@angular/core";

@Injectable()
export class ColorGenerator {
  constructor() {
    console.log("created");
  }

  COLORS: any[] = [
    "#f49daf",
    "#ff6565",
    "#9e3a3a",
    "#4854e0",
    "#777a9c",
    "#d397de",
    "#ad8df7",
    "#81b2f7",
    "#54e3ff",
    "#eed57b",
    "#bd2222",
    "#cae6ba",
    "#4da5ee",
    "#85e278",
    "#fca174",
    "#be5d1d",
    "#fff475",
    "#286886",
    "#5eebb7",
    "#9f3eac",
  ];

  public getColor(str: string): string {
    return this.COLORS[Math.abs(this.toNumber(str)) % this.COLORS.length];
  }

  private toNumber(str: string): number {
    let h = 3;

    for (let i = 0; i < str.length; i++) {
      h = 31 * h + str.charCodeAt(i);
      h |= 0; // Convert to 32bit integer
    }

    return h;
  }
}
