import { Image } from "react-native";

interface Props {
  imageUri?: string;
}

export default function ImagePickerPreview({
  imageUri,
}: Props) {
  if (!imageUri) {
    return null;
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={{
        width: "100%",
        height: 220,
        alignSelf: "center",
        borderRadius: 12,
      }}
    />
  );
}