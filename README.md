# LoCare

Roslyn Lu, Cian Costello, Sheldon Dong, Sahil Gandhi  
CSM117  
Spring 2018  

## Mobile App

1. Make sure your Android device is connected to your computer. You need an actual device for full functionality, including gathering of location data and sending text messages
2. Clone the LoCare repository  
	```sh
	git clone https://github.com/sahilmgandhi/LoCare.git
	```
3. Install homebrew (if you don't already have it)
	```sh
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	```
4. Install node and watchman
	```sh
	brew install node  
	brew install watchman  
	```
5. Install React Native CLI  
	```sh 
	npm install -g react-native-cli
	``` 
6. Navigate to LoCare
7. Initialize your react native project
	```sh 
	react-native init MobileApp
	```  
8. Run your project
	```sh
	cd MobileApp
	react-native run-android
	```  
9. The app will install itself on your device and run  

