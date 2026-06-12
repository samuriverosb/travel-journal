import { View, Text } from "react-native";

interface Props {
    totalTrips: number;
    mostRecentTrip?: string;
}

export default function TravelSummary({
    totalTrips,
    mostRecentTrip,
}: Props) {
    return (
        <View
            style={{
                backgroundColor: "#F5F7FA",
                padding: 20,
                marginVertical: 16,
                borderRadius: 16,
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Travel Summary
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View>
                    <Text
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Total Trips
                    </Text>

                    <Text
                        style={{
                            fontSize: 32,
                            fontWeight: "bold",
                        }}
                    >
                        {totalTrips}
                    </Text>
                </View>

                <View
                    style={{
                        alignItems: "flex-end",
                        maxWidth: 150,
                    }}
                >
                    <Text
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Most Recent
                    </Text>

                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "600",
                        }}
                    >
                        {mostRecentTrip || "No trips yet"}
                    </Text>
                </View>
            </View>
        </View>
    );
}