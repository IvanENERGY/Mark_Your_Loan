<h1>Repo Introduction</h1>
This application is avaliable on <a href="">Google Play Store</a> and <a href="">App Store</a>
<p>[screenshots/play/feature_graphics.png]</p>

![feature_graphics](https://github.com/user-attachments/assets/bab8b946-4f09-467e-9041-fa2cf2f083ad)
<p>Mark Your Loan is an application which allows users to record the amount they borrow from friends and the amount they help friends to pay. </p>
<p>The application is simple and easy to use,  users can insert borrowing records and helping records, view the list of records at anytime. They can also select a specific friends to see the records related to that friend. </p>
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

![1](https://github.com/user-attachments/assets/afb939cf-98e9-4e9f-a766-27dfc4fe125c)
<p>[screenshots/play/2.png]</p>

![2](https://github.com/user-attachments/assets/3765f711-8d31-4bdb-b5b7-44f0026aa109)
<p>[screenshots/play/3.png]</p>

![3](https://github.com/user-attachments/assets/7fc8985c-e797-401b-9987-312cc931a691)
<p>[screenshots/play/4.png]</p>

![4](https://github.com/user-attachments/assets/3008f350-f154-4d2a-b50c-abaf8e316349)
<p>[screenshots/play/5.png]</p>

![5](https://github.com/user-attachments/assets/0adc3b45-290e-400b-b7ac-6d30d1dbb3f9)
<p>[screenshots/play/6.png]</p>

![6](https://github.com/user-attachments/assets/39c71258-eeb7-4055-9495-b51ee6ca07cb)
<p>[screenshots/play/7.png]</p>

![7](https://github.com/user-attachments/assets/8a49df22-d48e-4f67-b9c1-7e33ae5c03d3)
<p>[screenshots/play/8.png]</p>

![8](https://github.com/user-attachments/assets/35194254-7808-4de8-8cda-b76a4d2a2bdf)
<h1>&#128640;Notes on building android (apk/aab) on window wsl (Linux  ubuntu) LOCALLY</h1>

<ol>
<li>
Follow tutorial on https://dev.to/milic128/expo-build-with-windows-10n2 
</li>
Install Ubuntu on window<br>
<pre>
wsl --install 
wsl --list --online
wsl --install -d Ubuntu
</pre>
restart pc<br>
open ubuntu terminal from window task bar->account creation<br>
open ubuntu terminal in Vs code terminal<br>
Install OpenJDK you can set the version that you want, in my case I used version 17:
<pre>
sudo apt update
sudo apt install openjdk-17-jdk-headless gradle
</pre>
set path to JAVA_HOME
<pre>
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
</pre>
Install Android command-line tools:
<pre>
cd ~
curl https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip -o /tmp/cmd-tools.zip
mkdir -p android/cmdline-tools
unzip -q -d android/cmdline-tools /tmp/cmd-tools.zip
mv android/cmdline-tools/cmdline-tools android/cmdline-tools/latest
rm /tmp/cmd-tools.zip
</pre>
Set correct path for variables:
<pre>
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${PATH}
</pre>
Accepting SDK licenses:
<code>yes | sdkmanager --licenses</code><br>
Installing SDK components (set correct android versions):
<code>sdkmanager --update</code><br>
<code>sdkmanager "platforms;android-33" "build-tools;33.0.0"</code><br>


Try <code> eas login</code>, add the <code>eas.json</code> file then building using  <code>eas build --platform android --profile dev --local</code><br>
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

<li>Error fixing on <i>/mnt/c/Users/Sunday/AppData/Roaming/npm/node_modules/eas-cli/node_modules/@oclif/core/lib/command.js:41
delete this.globalFlags?.json; This error can be solved by updating nodejs</i></li>
Solution: Update nodejs ver 20
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

<i>Sometimes failed and say SDK not found, just go root and reset android_home variable</i>

<li>Remove all node modules download in window (window should ask for permission by popup), do npm install using ubuntu, </li>


<li><code>eas build --platform android --local --profile dev</code></li>
</ol>
<p>for ios, run <code>eas build --platform ios --profile dev</code> </p>
<p>The building would be done on eas server, and result can be found at http://expo.dev</p>