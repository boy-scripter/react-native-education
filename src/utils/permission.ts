import { Alert, Platform } from 'react-native';
import { check, request, RESULTS, Permission, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

type PermissionPurpose = | 'camera' | 'image' | 'file' | 'location' | 'microphone';
const PLATFORM_VERSION = Number(Platform.Version);


export function getPermission(purpose: PermissionPurpose): Permission {
    console.log()
    switch (purpose) {
        case 'camera':
            return Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA;

        case 'image':
            return Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PLATFORM_VERSION >= 33
                    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

        case 'file':
            return Platform.OS === 'ios'
                ? PERMISSIONS.IOS.MEDIA_LIBRARY // or DOCUMENTS if applicable
                : PLATFORM_VERSION >= 33
                    ? PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
                    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

        case 'location':
            return Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        case 'microphone':
            return Platform.OS === 'ios'
                ? PERMISSIONS.IOS.MICROPHONE
                : PERMISSIONS.ANDROID.RECORD_AUDIO;

        default:
            throw new Error('Unknown permission type');
    }
}


export async function ensurePermission(
    permission: PermissionPurpose,
    options?: {
        title?: string;
        message?: string;
        onGranted?: () => void;
        onDenied?: () => void;
    }
): Promise<boolean> {
    try {
        const PERMISSION_REQUESTED = getPermission(permission)
        console.log(PERMISSION_REQUESTED)
        const status: PermissionStatus = await check(PERMISSION_REQUESTED);

        switch (status) {
            case RESULTS.UNAVAILABLE:
                Alert.alert(
                    options?.title || 'Permission unavailable',
                    options?.message || 'This feature is not available on your device.'
                );
                options?.onDenied?.();
                return false;

            case RESULTS.DENIED: {
                const newStatus = await request(PERMISSION_REQUESTED);
                if (newStatus === RESULTS.GRANTED) {
                    options?.onGranted?.();
                    return true;
                } else {
                    Alert.alert(
                        options?.title || 'Permission denied',
                        options?.message || 'Permission was denied. You may enable it from settings.'
                    );
                    options?.onDenied?.();
                    return false;
                }
            }

            case RESULTS.BLOCKED:
                Alert.alert(
                    options?.title || 'Permission blocked',
                    options?.message ||
                    'Permission has been blocked. Please enable it manually from settings.'
                );
                options?.onDenied?.();
                return false;

            case RESULTS.GRANTED:
            case RESULTS.LIMITED:
                options?.onGranted?.();
                return true;

            default:
                return false;
        }
    } catch (error) {
        console.error('Permission error:', error);
        return false;
    }
}