import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';
import { ViewProps } from 'react-native';

export type Props = {
  url?: string;
} & ViewProps;

const NativeView: React.ComponentType<Props> = requireNativeViewManager('MyModule');

export default function MyModuleView(props: Props) {
  return <NativeView {...props} />;
}
