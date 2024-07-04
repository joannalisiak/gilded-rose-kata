export class Item {
  constructor(
    public readonly name: string, 
    public sellIn: number, 
    public quality: number) {}
}

enum ItemName {
  BRIE = "Aged Brie",
  CONCERT = "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS = "Sulfuras, Hand of Ragnaros"
}

export class GildedRose {

  constructor(private readonly items: Item[]) {}

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name != ItemName.BRIE && item.name != ItemName.CONCERT) {
        if (item.quality > 0) {
          if (item.name != ItemName.SULFURAS) {
            item.quality -= 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1
          if (item.name == ItemName.CONCERT) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality += 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality += 1
              }
            }
          }
        }
      }

      if (item.name != ItemName.SULFURAS) {
        item.sellIn -= 1
      }

      if (item.sellIn < 0) {
        if (item.name != ItemName.BRIE) {
          if (item.name != ItemName.CONCERT) {
            if (item.quality > 0) {
              if (item.name != ItemName.SULFURAS) {
                item.quality -= 1
              }
            }
          } else {
            item.quality = 0
          }
        } else {
          if (item.quality < 50) {
            item.quality += 1
          }
        }
      }
    })

    return this.items;
  }
}
