# &lt;Avatar&gt;

Universal avatar makes it possible to fetch/generate an avatar based on the information you have about that user.
We use a fallback system that if for example an invalid Facebook ID is used it will try Google, and so on.

For the moment we support following types:
* Facebook
* Google
* Skype
* Gravatar
* Name initials
* Custom text
* Custom image

The fallbacks are in the same order as the list above were Facebook has the highest priority.

## Demo

[Check it live!](http://sitebase.github.io/react-avatar)

## Install

Install the component using [NPM](https://www.npmjs.com/):

```sh
$ npm install react-avatar --save
```

Or [download as ZIP](https://github.com/sitebase/react-avatar/archive/master.zip).


## Usage

1. Import Custom Element:

    ```js
    var Avatar = require('react-avatar');
    ```

2. Start using it!

    ```html
    <Avatar />
    ```

Some examples:

    <Avatar google-id="118096717852922241760" size="100" round="true" />
    <Avatar facebook-id="100008343750912" size="150" />
    <Avatar skype-id="sitebase" size="200" />
    <Avatar name="Wim Mostmans" size="150" />
    <Avatar value="86%" size="40" />
    <Avatar size="100" facebook-id="invalidfacebookusername" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" />

## Options

|   Attribute   |      Options      | Default |                                              Description                                               |
| ------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `email`       | *string*          |         | String of the email address of the user. You can also provide an MD5 hash.                             |
| `facebook-id` | *int* OR *string* |         |                                                                                                        |
| `google-id`   | *int*             |         |                                                                                                        |
| `skype-id`    | *string*          |         |                                                                                                        |
| `name`        | *string*          |         | Will be used to generate avatar based on the initials of the person                                    |
| `value`       | *string*          |         | Show a value as avatar                                                                                 |
| `color`       | *string*          | random  | Used in combination with `name` and `value`. Give it a fixed color with a hex like for example #FF0000 |
| `size`        | *int*             | 50      | Size of the avatar                                                                                     |
| `round`       | *bool*            | false   | Round the avatar corners                                                                               |
| `src`         | *string*          |         | Fallback image to use                                                                                  |

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install [Grunt](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g grunt-cli
    ```

* Install local dependencies:

    ```sh
    $ npm install
    ```

* Auto build new test version when developing that can be run with `grunt connect`:

    ```sh
    $ grunt watch
    ```

* To test your project, start the development server and open `http://localhost:8000`.

    ```sh
    $ grunt connect
    ```

* To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ grunt deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/sitebase/react-avatar/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)

## Todo
* Add Jest unit tests
