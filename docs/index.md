<h1 align="center">IMAGE DOWNLOADER</h1>

<p align="center">
    <img src="./assets/icons/tile_big.png" alt="icon" width="440" height="280">
</p>

## NEWS

### Version 2 is released!!

I released version 2.
I made various improvements.

* New imgur like style
* Add settings item
* Rebuild almost codes
* Performance improvement

Please report from [Chrome Web Store](https://chrome.google.com/webstore/detail/image-downloader/leakgmkipjfnmnacgakpggmilnhlmbcg)
if there are any improvements, bugs, etc...

## Details

> Note:
> You can download this extension from 
[Chrome Web Store](https://chrome.google.com/webstore/detail/image-downloader/leakgmkipjfnmnacgakpggmilnhlmbcg)
or
[releases](https://github.com/hatai/image-downloader/releases)

This project is forked from [image-downloader](https://github.com/vdsabev/image-downloader).
This includes several bug fixes.

If you need to bulk download images from a web page, with this extension you can:

* See images that the page contains and links to
* Filter them by width, height, and URL; supports wildcard and regex
* Optionally show only images from links
* Select images to download by clicking on the image
* Use dedicated buttons to download or open individual images in new tabs
* Customize image display width, columns, border size, and color
* Hide filters, buttons and notifications you don't need

## Known Issues

This extension can't always extract the full-resolution images that open when you click a photo (e.g. in Facebook albums). 
That's because the page doesn't directly link to the image, but uses a script. 
If you need that kind of functionality, there are other extensions that can be useful 
like Hover Zoom, even if you can't mass download images with it.

## Change log

### Version 2.3.1

* Update some modules

### Version 2.3.0

* Show progress bar
* Show image size

### Version 2.2.2

* Fix layout collapse

### Version 2.2.1

* Fix some bugs

### Version 2.2.0

* Add new option: "only images has same hostname"

### Version 2.1.2

* Fix bugs

### Version 2.1.1

* Upgrade node modules

### Version 2.1.0

* Fixed bugs
* Add settings item

### Version 2.0.0

* New imgur like style
* Rebuild almost codes
* Performance improvement
    
## Screenshots

![default][screenshots_1]

![modal][screenshots_2]

![settings][screenshots_3]

[screenshots_1]: ./assets/images/chrome_2019-03-18_10-32-46.png
[screenshots_2]: ./assets/images/chrome_2019-03-18_10-34-54.png
[screenshots_3]: ./assets/images/chrome_2019-03-18_10-33-44.png

## Credits

This extension is and always will be free, open-source,
and without ads or tracking algorithms of any kind.
You can find source code here: [GitHub](https://github.com/hatai/image-downloader)
    
## Licence

Copyright (c) 2019 Taigen Hamada

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
