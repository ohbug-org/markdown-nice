import QRCode from "yaqrcode";

function makeRule(md) {
  return function replaceLinkWithQrCode() {
    md.renderer.rules.link_open = function replaceOpen(tokens) {
      const open = tokens.find((v) => v.type === "link_open");
      const text = tokens.find((v) => v.type === "text");
      const textContent = text ? text.content : "";
      const attr = open.attrs[0];
      if (attr) {
        const href = attr[1];
        if (href) {
          return `<section class="qrcode-root">
          <section class="qrcode-left">
            <strong class="qrcode-title">长按识别二维码查看原文</strong><p class="qrcode-href">${href}</p>
          </section>
          <section class="qrcode-right">
            <img class="qrcode-img" src="${QRCode(href)}" alt="${textContent}" />
          </section>`;
        }
      }
      return `<section>`;
    };
    md.renderer.rules.link_close = function replaceClose() {
      return "</section>";
    };
  };
}

export default (md) => {
  md.core.ruler.push("qrcode", makeRule(md));
};
