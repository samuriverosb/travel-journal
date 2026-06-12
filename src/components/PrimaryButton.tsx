import {
    TouchableOpacity,
    Text,
} from "react-native";

import {
    Colors,
} from "../theme/colors";

interface Props {
    title: string;
    onPress: () => void;
}

export default function PrimaryButton({
    title,
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor:
                    Colors.primary,

                padding: 14,

                borderRadius: 12,

                alignItems: "center",
            }}
        >
            <Text
                style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 16,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}