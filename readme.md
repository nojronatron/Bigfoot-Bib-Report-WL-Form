# Bigfoot Bib Report Winlink Form

## Table of Contents

- [Overview](#overview)
- [Form and Template Version](#form-and-template-version)
- [How Winlink Forms Work](#how-winlink-forms-work)
- [How Bib Data Is Recorded At Aid Stations](#how-bib-data-is-recorded-at-aid-stations)
- [Demonstration Form](#demonstration-form)
- [Download Files](#download-files)
- [How to Install This Form and Template](#how-to-install-this-form-and-template)
- [Form Usage in Winlink Express](#form-usage-in-winlink-express)
- [Development](#development)
- [Branching](#branching)
- [Pull Requests](#pull-requests)
- [Final Thoughts](#final-thoughts)

## Overview

[Destination Trail](https://www.destinationtrailrun.com/) holds an ultra trail marathon event in Washington State every summer called [Bigfoot 200](https://www.destinationtrailrun.com/bigfoot). The event spans a 200+ mile course through the Gifford Pinchot National Forest and the Mt.St.Helens Volcanic Monument.

Participants are tracked as they arrive and depart (or drop out of the race) at each one of the many remote aid station sites along the route.

Hams volunteer their time and equipment to provide communications between aid station sites and race headquarters. One component of tracking runners is to capture and transmit reports of participant's bib numbers from each checkpoint. In the past this was done by voice transmissions, either simplex or a small repeater network. More recently, Winlink has become the preferred method to transfer these 'bib reports' to race coordinators. Winlink is like 'email over ham radio', allowing more rapid transfer or large amounts of information (like bib numbers), freeing the simplex and repeater channels for other voice traffic such as requesting medical supplies, water, and so on.

Race HQ receives the Winlink "bib reports" and enters them into a database. The database can be cross-referenced when estimating runner arrival at specific stations, or finding when and where a runner last checked in along the route.

This form was developed to standardize the message and data sent by the dozens of hams to race headquarters, reducing time to get the data, and simplifying data entry into the database.

For more information about Destination Trail and their ultra trail running marathons, see [DestinationTrailRun.com](https://www.destinationtrailrun.com/).

## Form and Template Version

This version of the form was built from a prior version using these files:

- "Race Tracker Initial.html" aka The Form. This is a single-page website built with html, javascript, and css.
- "Race Tracker.txt" aka The Template. A plain-text file with special keywords elements to receive data produced by the Form.

These files were updated to meet the needs of the Bigfoot 200 ultramarathon specifically.

The latest version of the Form and Template will always be published to the [GitHub Releases page](https://github.com/nojronatron/Bigfoot-Bib-Report-WL-Form/tags).

Semantic versioning has been applied. My intention is to maintain a hard-coded version in the Form and keep the Releases packages synchronized manually until a better solution can be found. The Form version variable will automatically transfer to the Message Template upon submission so that it can be known which version of the code an operator is using, for debugging purposes.

## How Winlink Forms Work

There are two components to a Form:

- Winlink Template (a text file)
- Winlink Form (an html file)

The plain text Winlink Template describes how data is placed within an open Winlink Message.

The Winlink Form is a single-page website that prompts the user for the necessary data.

When done entering data, the Winlink operator clicks the Submit button on the Form, which transfers the form data to a new Winlink Message window.

The Template file arranges the inputted data via the Form, into an expected, formal format.

The recipient of the message will get the same data formatting and layout with each message, every time. This simplifies processing the data by any recipients.

For more information about Winlink Express, the Winlink System, and Winlink Forms, see [Winlink.org](https://www.winlink.org).

## How Bib Data Is Recorded At Aid Stations

Aid Station volunteers should have a notebook of all the possible bib numbers that are registered for the race. As runners enter and leave each Aid Station (or drop from the event), their bib information is updated in that notebook. Hams take note of each bib number in/out/drop time and date, and enter them into this form on their Winlink Express workstation. The form is then submitted as a New Winlink Message and posted to the Winlink Outbox, where it will be transmitted either Peer-to-peer to another station, or via the Winlink System using an RMS (Relay) station. Race headquarters utilizes Winlink Express to 'pick up' messages from the Winlink System using Telnet, or via amateur RF bands.

## Demonstration Form

The latest release of Bigfoot Bib Report Form can be [interacted with online using this demonstration page](https://enchanting-pony-09ae40.netlify.app/bigfoot-bib-report-initial) so you can see what the form looks like and its functionality without having to install it locally.

You can also view the Bib Report [plain text Template file](https://enchanting-pony-09ae40.netlify.app/bigfoot-bib-report.txt) and see how the Winlink Message is formulated using data entered in the Form, above.

In order to get the full functionality and integration with Winlink Express, the files must be installed to your Winlink Express workstation. See [How to Install This Form and Template](#how-to-install-this-form-and-template) for details.

## Download Files

There are 2 files to download: "Bigfoot Bib Report Initial.html" and "Bigfoot Bib Report.txt".

You have options as to where to get them (in preferential order):

1. Download template and form files from [releases page](https://github.com/nojronatron/Bigfoot-Bib-Report-WL-Form/releases).
1. The least-likely to be up-to-date: [Google Drive](https://drive.google.com/file/d/1xa1nm6opetl664bXLFhkogGXK54cXs3z/view)

The Two Files you will need are:

> Bigfoot-Bib-Report-Initial.html
> Bigfoot-Bib-Report.txt

When downloading from the Releases page, ignore the zip files they are not necessary.

## How to Install This Form and Template

1. Download the Template and Form files (as indicated above).
1. Copy `Bigfoot-Bib-Report-Initial.html` and `Bigfoot-Bib-Report.txt` to your Winlink Express installation base folder at sub-folder `{your callsign}\Templates`.
1. Optional: Create a new folder within the Templates directory for these files.
1. Open Winlink Express.
1. Click the Messages menu and select `New Message`.
1. In the New Message window, click `Select Template`.
1. In the Template Manager window, double-click `{your callsign} Templates`.
1. Click `Bigfoot-Bib-Report-txt`.

Note: Winlink Express might be installed in folder `C:\RMS Express` or `C:\Winlink Express`. Either way, these are the base directories, and the callsign and Templates sub-folders will be within.

### Set As Favorite Template (optional)

1. Open Winlink Express.
1. Click the Messages menu and select `Set Favorite Templates`.
1. Supply a display name, for example: `BF Bib Report`.
1. Click `Browse` and locate `Bigfoot Bib Report Initial.html`.
1. Click `Save`.

Whenever you start a new message, a button named `BF Bib Report` will be along the top of the New Message window (as you named it). Click it to launch the Form.

For detailed instructions on the installation of Winlink Forms and Templates see [Winlink.org](https://www.winlink.org).

## Form Usage in Winlink Express

_Note_: It is up to the Winlink operator to select an appropriate amateur channel and mode to transfer that runner data to event headquarters. Usual methods include simplex VHF (Packet or VARA FM), or HF (ARDOP or VARA HF). Peer-to-Peer or relay via remote RMS stations are utilized.

Overall these steps are necessary:

1. Open and prepare the form.
1. Enter bib data into the form.
1. Decide when to store or load existing race data.
1. Submit the Form and post the message to the Outbox.

### Open The Form

1. Open a new message and then click Select Template.
1. Drill down into the Templates Tree to find this Form and select it with the mouse.
1. Click the Select menu item. The form opens in a new browser tab (or window).

### Prepare Common Form Data

Enter information into the top section of the form. What you enter here will update the _subject line_ of the message, and will stick with the form until you submit it.

_Note_: Many browsers will store previously entered data into fields. It is not a feature of the Form. You might (or might not) want your browser to do this.

1. Enter an Event Title.
1. Update the Message Number (start with 1 unless instructed otherwise). You can use the Increment button to simplify tracking message numbers.
1. Add Callsign(s) of the recipients you want to send the completed message to.
1. Select your Location (all current Aid Station Names, start, and finish are in the drop-down list).

_Note_: The Subject will get automatically updated. _Review it to be sure it is accurrate_ before continuing.

### Store And Load Existing Race Data

The Save and Load buttons are there to help you save data you have already entered, and load it again later to continue where you left off.

You could use the Save and Load buttons to store data in a Form on one computer, copy it to a thumb drive or transfer using Bluetooth, and then have another computer with Winlink Express installed _Load the data_ and then send it via Telnet or RF means.

You can also use the Save button to keep a local copy of all Bib Report Messages you have sent, and review the data on any computer by just using a plain text editor like Notepad++, UltraEdit, TextEdit, Nano, etc.

_Always use the Save button_ before submitting your data to a message, that way you can always go back to the data using the Load button.

#### Save Existing Race Data

This functionality will help you store all of the form field data in the form including the top (header) section and entered bib data.

1. Complete the top section of the form.
1. Click the SAVE RACE DATA button.
1. A pop-up will appear with a filename.
1. Optional: Rename the file something that represents your aid station such as "Chain of Lakes WL Form Header.txt".
1. Click OK and the file will be stored in the directory that your browser is set to download files to, usually `Downloads`.

#### Load Existing Race Data

1. Open the Form.
1. Click the LOAD RACE DATA button and a Windows Explorer view will appear. If you are lucky it will point to the correct directory where the data file lives.
1. Select the ".txt" file you want to load data from. For example "Chain of Lakes WL Form Header.txt" to pre-load a partially completed form you may have saved previously.
1. Continue entering bib data into the form and either Store the data again to a new ".txt" file, or click Submit.(#submit-completed-form-and-post-message-to-outbox) the data when done.

### Enter Bib Data Into The Form

The form allows you to click or tap on input fields to select them, and you can use the TAB key on your keyboard to move between fields. Selecting items can be done with a click, tap, or using the spacebar.

1. Click the empty box next to `Bib or Rider`.
1. Enter the bib number. For example `101`.
1. Press Tab to move to the "Time" entry box and the current 24-hour time will appear in the box for the _current day_.
1. _As necessary_ update the time to an accurate representation of the time the runner arrived, left, or dropped. Generally, this timestamp should be close to actual, but is _not an official record_.
1. Click the checkbox labeled `Yesterday` to tell the Form the time references _yesterday_.
1. Click IN, OUT, DROP depending on what the runner `Action` was.

The correctly formatted bib data will appear in the window below and the `Number of Entries` count will increase by `1` for every enty you complete.

_Important_: All bib data inside the entries window will disappear without chance for recovery if you click the Clear Entries button. The only way to recover those entries is to have already used the [SAVE RACE DATA Button](#store-and-load-existing-race-data) as described above.

### Submit Completed Form And Post Message To Outbox

1. Check that the `Number of Entries` contains an accurrate count of entries.
1. Add any free-form comments in the Comments box near the bottom of the form. _Do not include time-sensitive information!_ Use another mode of communication instead.
1. Click `Save Race data` to store the completed data.
1. Click `SUBMIT`.
1. The browser tab will tell you it is safe to close it but _DO NOT CLOSE IT_. Try to leave one browser tab open to get a fully featured experience using the Form.
1. Swith to the fully-populated message (`Alt + Tab` on the keyboard or select the Winlink Message icon on the Task Bar).
1. Click `Post Message to Outbox` and follow appropriate procedures for transmitting the message at an appropriate time.

## Development

This project utilizes HTML, Javascript, CSS, and plain text. Compatibility is biased toward supporting Windows 7-era browsers and mobile devices, over latest-greatest features and functionality.

Good news for developers is single-page websites have no specific build requirements. It is helpful to have an operable and up-to-date version of Winlink Express installed on (or near) your development machine, as well as a bunch of browsers for testing/viewing results.

This form should support the top ~~three~~ four popular browsers including Chrome, Firefox, Edge, and a few versions of IE in its latter years. The goal is to keep this single-page web-app compatible with browsers and versions that were common while Windows 7 was released (and later).

If you run across issues using this form in a specific browser, use the [Discussions](https://github.com/nojronatron/Bigfoot-Bib-Report-WL-Form/discussions/11) page to search for existing information, submit a [GitHub Issue](https://github.com/nojronatron/Bigfoot-Bib-Report-WL-Form/issues), or [contact me](k7rmz@arrl.net).

### Development Help Wanted

Wanted: _Your help and input developing this form!_

Contact [K7RMZ at ARRL dot NET](k7rmz@arrl.net) with a message about your interest(s) and a link to your Github profile. Be sure to include the name of this repository in the subject line.

### To Develop Locally

1. Fork this repo to your own Github account.
1. Clone this repo to your local dev environment.
1. Create a development branch named appropriately for what work you are about to do.
1. Open the project in your preferred HTML, CSS, and javascript editor/IDE. I _highly recommend_ VS Code to automatically import `settings.json` which will help to avoid very large commits with many unnecessary changes.
1. Add, Commit, and Push your changes with appropriate comments.
1. When you are done adding or editing the code, open a [Pull Request](#pull-requests) with appropriate documentation.
1. If there is already an Issue and/or Discussion related to the work, please mention those in your PR Comment using the `#` [shortened linking method](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests).

## Branching

This repository uses a Root branching pattern.

_main_ is protected and requires approvals to merge code into it.

Any commits, new or patch, must be based on `main` and ready to merge without merge conflicts in order to be considered. I will work with you to help resolve merge conflicts only after you have tried. See [Github's Resolving Merge Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line) and [Atlassian's Resolving Merge Conflicts](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts) for help understanding and resolving merge conflicts.

Your dev or patch branch should be created in your local dev environment and be based on 'main' in this repository for best results.

## Pull Requests

A Pull Request should have helpful comments within it:

1. Brief subject line indicating the fix or inhancement.
1. Detailed comments in the body of the PR following the problem-solution-result format.
1. Body of the message should include a link to an associated GitHub Issue using the `#` [shortened linking method](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests).
1. Include details on which browser(s) are affected.

## Final Thoughts

Have fun!

This is a personal effort of love for coding and ham radio, and I have made this project open to benefit the amateur community.

The original author might import restrictions or limitations on use of their source code. Please see [Winlink.org](https://winlink.org/) for details about the originating source code.

[Back To Top](#bigfoot-bib-report-winlink-form)
