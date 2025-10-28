export const domain: string = 'stickersmashexpoboiler.page.link';

export const bundleId: string = 'com.simform.stickersmashexpoboiler';

export const deepLinkPrefixes = ['stickersmashexpoboiler://', `${domain}//`, `https://${domain}`];

export enum DeepLink {
  // stickersmashexpoboiler://magic_link&lang=en&tenantId=austin-electrical-qqm76
  MagicLink = 'magic_link',
  // stickersmashexpoboiler://forgot_password&lang=en&tenantId=austin-electrical-qqm76
  ForgotPassword = 'forgot_password',
  // stickersmashexpoboiler://?toastMessage=<message content>
  ToastMessage = 'toastMessage'
}

export default DeepLink;
