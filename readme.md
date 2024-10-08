<h1>Repo Introduction</h1>
This application is avaliable on <a href="https://play.google.com/store/apps/details?id=com.ivanchantf.MarkYourLoan">Google Play Store</a> 

<p>[screenshots/get_it_on_play_badge.png]</p>
<a href="https://play.google.com/store/apps/details?id=com.ivanchantf.MarkYourLoan"><img src="https://github.com/user-attachments/assets/8bf90edc-ac37-48ec-b412-4959b8bd9063" width="200"/></a> 

<p>[screenshots/play/feature_graphics.png]</p>
<img src="https://github.com/user-attachments/assets/925b72a1-bd33-46c7-9294-2579ea77c3ee"/>

<p>[screenshots/project_mark_your_loan.png]</p>
<img src="https://github.com/user-attachments/assets/b13ece6e-11a4-499a-824f-5a03bb639bdd"/>

<p>Mark Your Loan is an application which allows users to record the amount they borrow from friends and the amount they help friends to pay. </p>
<p>The application is simple and easy to use,  users can insert borrowing records and helping records, view the list of records at anytime. They can also select a specific friend to see the records related to that friend. </p>
<p>The application supports English and Chinese.</p>
<p>**Network not required</p>
<p>**All data are stored in your phone local storage, no data would be exposed to the network.</p>
<hr>
<p>(Mark數/記帳小工具) 是一個可以用于記錄帳目的應用程式 。</p>
<p>程式簡潔易用，用家可以輸入借款紀錄、幫朋友付款的記錄 ，便可以將相關紀錄儲存於手機內， 隨時查閱，用家更可以選擇某位朋友，查看有關他的借款和幫助紀錄。</p>
<p>程式提供兩種語言(英文及中文) ，可于設定內選擇 。</p>
<p>**無需網絡連接</p>
<p>**所有數據均儲存於用家的手機內</p>

<h1>Screenshots</h1>
<p>[screenshots/play/1.png]</p>


<img src="https://github.com/user-attachments/assets/7e73514a-922c-4973-a87d-ca7b6ff9b5e0"/>
<p>[screenshots/play/2.png]</p>


<img src="https://github.com/user-attachments/assets/c082f8e9-3a67-45c6-a099-dcb27b880ba6"/>
<p>[screenshots/play/3.png]</p>


<img src="https://github.com/user-attachments/assets/17d12c8f-5ac7-492d-acf7-fa1ddf6516cc"/>
<p>[screenshots/play/4.png]</p>


<img src="https://github.com/user-attachments/assets/d9afbcbf-b422-4fcc-a34c-bb4e9310e898"/>
<p>[screenshots/play/5.png]</p>


<img src="https://github.com/user-attachments/assets/970fa8eb-a782-4643-bae9-9999800c3c7f"/>
<p>[screenshots/play/6.png]</p>


<img src="https://github.com/user-attachments/assets/48271781-3e2d-4f6e-af37-213f9e100d0f"/>
<p>[screenshots/play/7.png]</p>


<img src="https://github.com/user-attachments/assets/3e97085e-3fe9-438d-8581-59d24a4cd812"/>
<p>[screenshots/play/8.png]</p>


<img src="https://github.com/user-attachments/assets/afc93d64-b401-4848-898b-e7c80103e64d"/>

<h1>&#128640;Notes on building android (apk/aab) on window wsl (Linux  ubuntu) LOCALLY</h1>

<ol>
<li>
Follow tutorial on https://dev.to/milic128/expo-build-with-windows-10n2 
</li>
<ul>
<li>Install Ubuntu on window</li><br>
<pre>
wsl --install 
wsl --list --online
wsl --install -d Ubuntu
</pre>
<li>restart pc</li><br>
<li>open ubuntu terminal from window task bar->account creation</li><br>
<li>open ubuntu terminal in Vs code terminal</li><br>
<li>Install OpenJDK you can set the version that you want, in my case I used version 17:</li>
<pre>
sudo apt update
sudo apt install openjdk-17-jdk-headless gradle
</pre>
<li>set path to JAVA_HOME</li>
<pre>
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
</pre>
<li>Install Android command-line tools:</li>
<pre>
cd ~
curl https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip -o /tmp/cmd-tools.zip
mkdir -p android/cmdline-tools
unzip -q -d android/cmdline-tools /tmp/cmd-tools.zip
mv android/cmdline-tools/cmdline-tools android/cmdline-tools/latest
rm /tmp/cmd-tools.zip
</pre>
<li>Set correct path for variables:</li>
<pre>
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${PATH}
</pre>
<li>Accepting SDK licenses:</li>
<code>yes | sdkmanager --licenses</code><br>
<li>Installing SDK components (set correct android versions):</li>
<code>sdkmanager --update</code><br>
<code>sdkmanager "platforms;android-33" "build-tools;33.0.0"</code><br>


<li>Try <code> eas login</code>, add the <code>eas.json</code> file then building using  <code>eas build --platform android --profile dev --local</code></li><br>
eas.json
<pre>
{
    "build": {
        "dev": {
            "android": {
                "buildType": "apk"
            },
            "ios": {
                "buildConfiguration": "Debug"
            }
        },
        "preview": {},
        "prod": {
            "android": {
                
            },
            "ios": {
                "buildConfiguration": "Debug"
            }
        }
    }
} 
</pre>
</ul>
<li>&#65039;Error fixing on <i>/mnt/c/Users/Sunday/AppData/Roaming/npm/node_modules/eas-cli/node_modules/@oclif/core/lib/command.js:41
delete this.globalFlags?.json; This error can be solved by updating nodejs</i></li>
&#9989;Solution: Update nodejs ver 20
<pre>
sudo apt update
sudo apt upgrade -y
sudo apt install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm alias default 18.18.2     // version may be different here//do node --version for checking
node -v npm -v //for confirming the nodejs version
</pre>

<li>install everything  latest (dont forget adding <code> sudo </code>infront)</li>

-npm install -g npm@latest expo@latest eas-cli@latest

<i>&#65039;Sometimes failed and say SDK not found, just go root and reset android_home variable</i>

<li>Remove all node modules download in window (window should ask for permission by popup), do npm install using ubuntu </li>
<p><i>&#65039;If fails, check whether dependencies crash each other shown in red text when building (eg.expo-cli is included in expo)</i></p>

<li><code>eas build --platform android --local --profile dev</code></li>
</ol>
<h1>&#128640;Notes on IOS Deployment</h1>
<h2>app building</h2>
<p><i><strong>	&#10071;Reminded that app version no. in app.json should be something like "1.1.1" , "1.1.1+1" is not acceptable for ios, unlike android</strong></i></p>
<p> run <code>eas build --platform ios --profile dev</code> to build ipa</p>
<p>The building would be done on eas server, and result can be found at http://expo.dev</p>
<h2>Submitting app build to App Store</h2>
eas.json
<pre>
 "submit": {
        "production": {
            "android": {

            },
            "ios": {
                "appleId": "ivanchantf@gmail.com",
                "ascAppId": "6566179309",
                "appleTeamId": "96U5KK66PP"
            }
        }
    }
</pre>
<p> run <code>eas submit --platform ios  </code> </p>
<h2>Using iOS device simulator for taking screenshots for various dimension  (MAC OS) </h2>
<ol>
<li>Open the project folder</li>
<li>Run <code>sudo npx expo start --ios</code></li>
</ol>
<h3>Following guide are for solving issues like </h3>
<ul>
<li>Could not update simulator linking permissions: ENOENT: no such file or directory, open '/Users/tszfungchan/Library/Developer/CoreSimulator/Devices/ED071A39-0C39-4507-AE13-4B1236A47FE6/data/Library/Preferences/com.apple.launchservices.schemeapproval.plist'</li>
<li>Could not see the full list of emulator</li>
</ul>
<ol>
<li>Run<code> sudo npm install watchman</code>  (tool for watching changes in the filesystem)</li>
<li>Run <code>sudo -s</code>  </li>
<li>Run <code>npx expo start --ios</code> for once; that might not work</li>
<li>Run <code>exit</code></li>
<li>Run <code>npx expo start --ios</code> again for opening the app in simulator</li>
<li>shift + i for selecting device</li>
</ol>