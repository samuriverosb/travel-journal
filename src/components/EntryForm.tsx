import {
    View,
    Text,
    TextInput,
    Alert,
} from "react-native";

import { pickImage } from "../services/imageService";
import PrimaryButton from "./PrimaryButton";
import { getCurrentLocation } from "../services/locationService";

import ImagePickerPreview from "./ImagePickerPreview";
import LocationMap from "./LocationMap";

interface Props {
    title: string;
    description: string;
    imageUri?: string;
    latitude?: number;
    longitude?: number;

    onTitleChange: (value: string) => void;
    onDescriptionChange: (
        value: string
    ) => void;

    onImageChange: (
        uri?: string
    ) => void;

    onLocationChange: (
        latitude?: number,
        longitude?: number
    ) => void;
}

export default function EntryForm({
    title,
    description,
    imageUri,
    latitude,
    longitude,
    onTitleChange,
    onDescriptionChange,
    onImageChange,
    onLocationChange,
}: Props) {
    async function handlePickImage() {
        const uri = await pickImage();

        if (uri) {
            onImageChange(uri);
        }
    }

    async function handleLocation() {
        try {
            const location =
                await getCurrentLocation();

            onLocationChange(
                location.latitude,
                location.longitude
            );

            Alert.alert(
                "Location Captured",
                "Location added successfully."
            );
        } catch {
            Alert.alert(
                "Permission Required",
                "Location permission is required."
            );
        }
    }

    return (
        <>
            <View
                style={{
                    marginBottom: 24,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#111827",
                        marginBottom: 12,
                    }}
                >
                    Trip Information
                </Text>

                <TextInput
                    placeholder="Trip Title"
                    placeholderTextColor="#6B7280"
                    value={title}
                    onChangeText={onTitleChange}
                    style={{
                        borderWidth: 1,
                        borderColor: "#DDD",
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 12,
                    }}
                />

                <TextInput
                    placeholder="Describe your experience..."
                    placeholderTextColor="#6B7280"
                    value={description}
                    onChangeText={
                        onDescriptionChange
                    }
                    multiline
                    style={{
                        borderWidth: 1,
                        borderColor: "#DDD",
                        borderRadius: 12,
                        padding: 12,
                        height: 120,
                        textAlignVertical: "top",
                    }}
                />
            </View>

            <View
                style={{
                    marginBottom: 24,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#111827",
                        marginBottom: 12,
                    }}
                >
                    Photo
                </Text>

                <PrimaryButton
                    title="Select Photo"
                    onPress={handlePickImage}
                />

                {imageUri && (
                    <View
                        style={{
                            marginTop: 12,
                        }}
                    >
                        <ImagePickerPreview
                            imageUri={imageUri}
                        />
                    </View>
                )}
            </View>

            <View
                style={{
                    marginBottom: 24,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#111827",
                        marginBottom: 12,
                    }}
                >
                    Location
                </Text>

                <PrimaryButton
                    title="Use Current Location"
                    onPress={handleLocation}
                />

                {latitude && longitude && (
                    <View
                        style={{
                            marginTop: 12,
                        }}
                    >
                        <LocationMap
                            latitude={latitude}
                            longitude={longitude}
                        />
                    </View>
                )}
            </View>
        </>
    );
}