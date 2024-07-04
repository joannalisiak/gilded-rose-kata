import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  describe("bread", () => {
    it("should decrease bread quality before expiration", () => {
      const bread = new Item("bread", 3, 10)
      const gildedRose = new GildedRose([bread])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(9)
    })

    it("should decrease bread quality after expiration", () => {
      const bread = new Item("bread", -2, 10)
      const gildedRose = new GildedRose([bread])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(8)
    })

    it("should decrease bread quality after expiration but not below zero", () => {
      const bread = new Item("bread", -2, 1)
      const gildedRose = new GildedRose([bread])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(0)
    })
  })

  describe("brie", () => {
    it("should increase brie quality", () => {
      const brie = new Item("Aged Brie", 10, 33)
      const gildedRose = new GildedRose([brie])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(34)
    })

    it("should increase brie quality but not above fifty", () => {
      const brie = new Item("Aged Brie", 10, 50)
      const gildedRose = new GildedRose([brie])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(50)
    })
  })

  describe("concert", () => {
    it("should increase concert quality", () => {
      const concert = new Item("Backstage passes to a TAFKAL80ETC concert", 16, 20)
      const gildedRose = new GildedRose([concert])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(21)
    })

    it("should increase concert quality but not above fifty", () => {
      const concert = new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49)
      const gildedRose = new GildedRose([concert])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(50)
    })

    it("should increase concert quality more when there are at least ten days left", () => {
      const concert = new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20)
      const gildedRose = new GildedRose([concert])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(22)
    })

    it("should increase concert quality even more when there are at least five days left", () => {
      const concert = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 20)
      const gildedRose = new GildedRose([concert])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(23)
    })

    it("should drop concert quality after the concert to zero", () => {
      const concert = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)
      const gildedRose = new GildedRose([concert])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(0)
    })
  })

  describe("sulfuras", () => {
    it("should never expire", () => {
      const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 10, 80)
      const gildedRose = new GildedRose([sulfuras])
      const items = gildedRose.updateQuality()
      expect(items[0].sellIn).toEqual(10)
    })

    it("should always have quality eighty", () => {
      const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 10, 80)
      const gildedRose = new GildedRose([sulfuras])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toEqual(80)
    })
  })
});
