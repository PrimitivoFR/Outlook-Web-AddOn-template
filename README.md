# Outlook-Web-AddOn-template

Base project for you to start writing your own Outlook web Add-On.

To get started, it has some basic routing + some basic queries to the Outlook API to list the attachments of the current email.
You can also download them.

## How do I run it ?

Well, first you gotta `git clone`, then `cd` inside it and :

- `npm i`
- `npm start`

Then grab the `manifest.xml` and add it to your outlook add-ons.

## How do I add it to my Outlook Add-ons ?

First, login to your Outlook Web Client.
Then, open of your email and click and the three dots on the top-right of the email.


<img src="https://i.ibb.co/48HZD3p/Annotation-2020-08-12-160317.png" />


Click on **"Download Add-Ons"**, then on the new window go to **"My Add-Ons"** (**"Mes compléments"** on the pic).

<img src="https://i.ibb.co/g6RXMd4/Annotation-2020-08-12-160610.png" />


Once you're there, scroll down and click on **"Add a custom add-on" > "Add from a file"** and select the `manifest.xml` file.


If the project has correctly started using the previous commands (`npm i` and `npm start`), the add-on should be available to use.


By clicking on **the three dots**, you should see **"Outlook-Web-AddOn"** in the list. That's the add-on, so you just click on it to start it.



## Misc

Made by [AppliNH](https://github.com/AppliNH).
Using [Angular](https://github.com/angular) and [Yo-Office](https://github.com/OfficeDev/generator-office)
