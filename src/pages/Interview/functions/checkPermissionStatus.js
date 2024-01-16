export async function checkPermissionStatus(permName) {
  try {
    const permissionStatus = await navigator.permissions.query({ name: permName });
    return permissionStatus.state === 'granted';
  } catch (error) {
    console.error(`Error checking ${permName} permission:`, error);
    return false;
  }
};