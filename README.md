## ScreenKIN - DOCS

### Introduction
ScreenKIN is a web-based application for real-time screen sharing using WebRTC technology. This guide provides detailed instructions for both the sender and receiver to establish a screen sharing session.

### To Use

#### Sender (Person 1)
1.  Select Option `Sender`:
    - Open the ScreenKIN application.
    - From the dropdown menu, select the `Sender` role.

2. Click `Start Sharing`
    - Press the `Start Sharing` button.

3. Select `window/screen` to share
    - Choose the window or screen you wish to share when prompted.

4. Copy `Offer` and `ICE Candidates`
    - Once sharing starts, an `Offer` will be generated. Copy this offer.
    - Also copy the generated `ICE Candidates`.
    
5. Send to your `Receiver (Person 2)`
    - Share the copied `Offer` and `ICE Candidates` with your receiver via your preferred method (email, messaging, etc.).

6. Receive and Paste `Answer`
    - Ask `receiver` to generate and share `Answer`
    - Paste the received `Answer` in the appropriate `input box`

#### Receiver (Person 2)
1. Select option `Receiver`
    - Open the ScreenKIN application.
    - From the dropdown menu, select the `Receiver` role.

2. Receive and Paste `Offer` and `ICE Candidates`
   - Ask `sender` to share `Offer` and `ICE Candidates`
   - Paste `Offer` and `ICE Candidates` in their respective `input boxes`

3. Copy the generated `answer`

4. Send it to `sender (Person 1)`

### Local Setup

#### Requirements:
- ScreenKIN is a simple website built using JavaScript, Html and Tailwind Css.

- The application uses WebRTC for media sharing


#### Steps to Run Locally

1. Clone the repository

    - `git clone https://github.com/porwalshreyaa/ScreenKin.git` <br>or <br>`git clone git@github.com:porwalshreyaa/ScreenKin.git`

2. Open `index.html` in a Browser