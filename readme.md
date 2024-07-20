<h1>Notes on building android (apk/aab) on window wsl (Linux  ubuntu) LOCALLY</h1>

<ol>
<li>
Follow tutorial on https://dev.to/milic128/expo-build-with-windows-10n2 
</li>

<code>wsl --install </code><br>
<code>wsl --list --online</code><br>
<code>wsl --install -d Ubuntu</code><br>
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