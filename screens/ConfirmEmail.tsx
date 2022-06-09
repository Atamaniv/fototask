import { View, Text } from "../components/Themed";
import { Button } from "native-base";
import { RootStackScreenProps } from '../types';

export default function ConfirmEmail({ navigation }: RootStackScreenProps<'NotFound'>) {
    return (
      <View>
        <Text>Confirm</Text>
        <Button onPress={() => navigation.replace('Root')} />
        <Button onPress={() => navigation.navigate( 'Root', { screen: 'TabTwo',   initial: false })} />
      </View>
    );
  }