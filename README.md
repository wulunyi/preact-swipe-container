# preact-scroll-container
The component of preact

## use
```javascript
import ScrollContainer from 'preact-scroll-container';
...
 <ScrollContainer calss="container" currentPage="0" totalPage="4" soft={true} onChange={(num)=>{console.log(num)}}>
    <ul>
        <li>...</li>
        <li>...</li>
        <li>...</li>
        <li>...</li>
    </ul>
 </ScrollContainer>
 ...

```

```sass
.container{
	width: 100vw;
	height: 100px;
	overflow: hidden;

	ul{
		width: 300%;
		overflow: hidden;

		li{
			float: left;
			width: 100vw;
			height: 100px;
		}
	}
}
```
