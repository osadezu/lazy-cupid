# Lazy Cupid

A silly but fully functional web app that allows someone who is short on time to fulfill their sweetheart's _demands_ on Valentine's Day in a just-in-time and couldn't-have-been-easier fashion (relationship success not guaranteed).

The user is given several options to customize a greeting card, including content obtained from the APIs listed below, and an option to add a personal message. When done, the user can copy an encoded URL which specifies the customizations so that the recipient can see it exactly as created without server-side data storage.

### See it here:

https://lazy-cupid.netlify.app/

## App Screenshot
<img width="1301" alt="20220111 Lazy Cupid screenshot" src="https://user-images.githubusercontent.com/24361930/148898075-44cffc2f-dffb-4476-88bb-01549c21fcf1.png">

## Technologies used

- Javascript, HMTL, CSS
- [React](https://reactjs.org/)
- [Browser Router](https://reactrouter.com/)
- Authenticated API requests (HTTP over TLS)

## Next Steps

- Refactor API calls to organize in modular functions that enable subsequent calls to add content to collections.
- Improve app logic to preserve states when returning from card preview to builder.
- Perform validation of search parameters when loading shared link to verify that the minimum components are present and no apparent errors are found.
- Use Protocol Buffers to compress url search parameters and obscure details.
- Add more customization options like images from a different API and

### Acknowledgement

The following APIs provide the greeting card content:

- [Paper Quotes](https://paperquotes.com/)
- [Cataas](https://cataas.com/)

## User Stories

- As a user, I want to customize a card so that I can send a personal message in little time.
- As a user, I want my message to be cute and graphically rich so that it can be more compelling and remembered.
- As a busy user, I want to send my custom card without account creation or logging in, so that I can do it in the least amount of time.
- As a user, I want to have several card customization options so that I know that my card is unique.
- As a user, I want to be sure that my card is visible exactly as I made it so that I know how my recipient will see it.

### MVP Goals

- Card can be customized with:
  - recipient and sender names
  - cat photo choices (from API)
  - quote choices (from API)
  - personal message
- Card can be sent by simply copying a url which encodes all customizations
- One URL displays the card builder UI to the originating user, a different URL is copied and sent to the recipient
