import { StyleSheet } from 'react-native';

export const theme="#73150F";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  smallText:{
    fontSize: 16,
    padding: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    padding: 10,
    marginBottom: 20,
  },
  button:{
    backgroundColor: '#73150F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText:{
    color: '#ffffff',
    fontSize: 18,
  },
  input: {
    width: "80%",
    height: 50,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  // Define other common styles here
});