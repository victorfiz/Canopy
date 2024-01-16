export function getRedirectPath({
    href
}) {
    const redirectRegex = /\/signup\?redirect=([^&\s]+)/;
    const match = href.match(redirectRegex);
    return match ? match[1] : '/settingup';
}

// Example usages:
