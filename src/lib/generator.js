import { EmojiMapping, BackgroundMapping, PatternMapping } from "app/constant";

function extractFileName(urls) {
  const fileNames = [];
  for (let url of urls) {
    const tempUrl = url.split("/");
    tempUrl.splice(0, 4);
    const fileName = tempUrl.join("").replace(".svg", "");
    fileNames.push(fileName);
  }
  return fileNames;
}

export function generateUniqueKey(urls, backgroundNum, pattern) {
  const uniqueKey = extractFileName(urls);
  uniqueKey.push(backgroundNum);
  uniqueKey.push(pattern);
  return uniqueKey.join("");
}

export function generateMetadata(urls, backgroundNum, pattern, uniqueKey) {
  const metadata = {
    name: `DDuckDDack V1 #${uniqueKey}`,
    description:
      "DDuckDDack(DDDD) is Cell phone wallpaper NFT. This is V1 for DDDD project",
    attributes: [],
  };
  // Add emoji type
  const fileNames = extractFileName(urls);
  for (const f of fileNames) {
    metadata["attributes"].push({
      trait_type: "Emoji",
      value: EmojiMapping[f],
    });
  }
  // Add background type
  metadata["attributes"].push({
    trait_type: "Background",
    value: BackgroundMapping[backgroundNum],
  });
  // Add pattern type
  metadata["attributes"].push({
    trait_type: "Pattern",
    value: PatternMapping[pattern],
  });

  return metadata;
}
