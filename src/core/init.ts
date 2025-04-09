import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  closingBehavior,
  swipeBehavior,
  settingsButton
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(debug: boolean): Promise<void> {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  settingsButton.mount();

  settingsButton.show();

  // working
  closingBehavior.mount();

  closingBehavior.enableConfirmation();

  // working
  backButton.mount();

  miniApp.mount();

  themeParams.mount();

  initData.restore();

  // working
  swipeBehavior.mount();

  void viewport
    .mount()
    .then(() => {
      viewport.bindCssVars();
    })
    .catch(e => {
      console.error('Something went wrong mounting the viewport', e);
    });

  // Define components-related CSS variables.
  miniApp.bindCssVars();

  themeParams.bindCssVars();

  // if (miniApp.setBackgroundColor.isAvailable()) {
  //   miniApp.setBackgroundColor('#000000');
  // }

  themeParams.accentTextColor();
}
