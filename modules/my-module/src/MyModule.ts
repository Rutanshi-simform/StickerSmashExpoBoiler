import { NativeModule, requireNativeModule } from 'expo';

export interface ChangeThemeEvent {
  theme: string;
}

declare class MyModule extends NativeModule {
  PI: number;
  setTheme: (theme: string) => void;
  getTheme: () => string;
  addListener: (
    eventName: 'onChangeTheme',
    listener: (event: ChangeThemeEvent) => void
  ) => { remove: () => void };
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MyModule>('MyModule');
