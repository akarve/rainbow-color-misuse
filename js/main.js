//TODO use require.js
//TODO use angular bindings instead so DOM is cleaner
var Engine = famous.core.Engine;
//LAYOUT
var HeaderFooterLayout = famous.views.HeaderFooterLayout;
var SequentialLayout = famous.views.SequentialLayout;
var Scrollview = famous.views.Scrollview;
var GridLayout = famous.views.GridLayout;
//SURFACE
var Surface = famous.core.Surface;
var ContainerSurface = famous.surfaces.ContainerSurface;
var ImageSurface = famous.surfaces.ImageSurface;
//MODIFIERS
var StateModifier = famous.modifiers.StateModifier;
var Modifier = famous.core.Modifier;
//CONTEXT
var mainContext = Engine.createContext();
//vis property dictionaries
var header = {'bg':'#ddd'};
var content = {'bg':'#eee', 'color':'#555'};
var rbow_img = {'width':800, 'height':399};
//GO
var layout = new HeaderFooterLayout({
  headerSize: 0
});
//CONTENT BODY
var scrollview = new Scrollview();
var surfaces = [];
scrollview.sequenceFrom(surfaces);
layout.content.add(scrollview);
//rainbow feature
var rainbow_cont = new ContainerSurface({
  size: [undefined, 250],
  properties: {
    overflow: 'hidden'
  }
});

var img = new ImageSurface({
  content: './img/nasa-heatmap-CO2-med.jpg'
});

var overlay = new Surface({
  size: [140, 80],
  content: 'Wrong',
  properties: {
    backgroundColor: 'rgba(32, 32, 32, 0.8)',
    textAlign: 'center',
    lineHeight: '80px',
    fontSize: '1.8em',
    fontWeight: 'bold',
    margin: '-16px 0 0 0' //shift up to compensate for img_detail text
  }   
});

var center_mod = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5]
});

var aspect_mod = new Modifier();
aspect_mod.sizeFrom(function(){
  var wid = mainContext.getSize()[0];
  var hgt = rainbow_cont.getSize()[1];
  var img_aspect = rbow_img.width/rbow_img.height;
  var par_aspect = wid/hgt;
  if(img_aspect >= par_aspect){
    return [img_aspect*hgt, hgt];
  }else{
    return [wid, wid/img_aspect];
  }
});

var lleft_mod = new StateModifier({
    align: [0.0, 1.0],
    origin: [0.0, 1.0]
});

var img_text = new Surface({
  size: [undefined, 32],
  content: "<a href='https://www.youtube.com/watch?v=x1SgmFa0r04'>NASA Goddard | A Year in the Life of Earth's CO2</a>",
  properties: {
    backgroundColor: 'rgba(32, 32, 32, 0.5)',
    textAlign: 'left',
    lineHeight: '32px',
    fontSize: '.8em',
    paddingLeft: '10px',
  }   
});
img_text.addClass('img-detail');

rainbow_cont.add(lleft_mod).add(img_text);

var node = rainbow_cont.add(center_mod);
node.add(overlay);
node.add(aspect_mod).add(img);

var uright_mod = new StateModifier({
    align: [1, 0],
    origin: [1,0]
});

var github = new Surface({
  size: [149, 149],
  content: "<a href='https://github.com/you'><img style='position: absolute; top: 0; right: 0; border: 0;' src='https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67' alt='Fork me on GitHub' data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png'></a>",
});
layout.content.add(uright_mod).add(github);

surfaces.push(rainbow_cont);

var body_surface = new Surface({
  size: [undefined, true],
  content:
  "\
  <p>\
    The rainbow color scheme is widely misused in visualizations for health, public policy, and popular science. \
    <strong>Rainbow color schemes distort data</strong>. \
    Distorted data leads to incorrect judgments on key issues, like climate change. \
    Improper use of rainbow color schemes is therefore <strong>poor journalism</strong>.\
  </p>\
  <p>\
    <strong>We can do better</strong>. \
    This brief article explains when and why rainbow color schemes are deceptive and what the alternatives are.\
  <p>\
  <h2>Why rainbow color schemes distort data</h2>\
    <p>\
      Rainbow color schemes obscure continuous numerical data for the following reasons:\
    </p>\
    <ul>\
      <li>They're <strong>not perceptual</strong>.\
        A perceptual color sequence works <em>a priori</em>; it requires no learning. \
        In contrast, the rainbow color sequence is learned.\
      </li>\
      <li>They're <strong>inaccessible to color-blind users.</strong></li>\
      <li><strong>Brightness varies unpredictably</strong> across rainbow color scales. \
        Brightness, or luminance, is among the most salient visual features. \
        Luminance is not monotonic across the rainbow color sequence. \
        The result is a mismatch between the perceptual features of the rainbow scheme and the underlying numerical data.\
      </li>\
    </ul>\
    <p>\
      See the References section for details of the rainbow color scheme's perceptual shortcomings.\
    </p>\
    <p>\
      <strong>Example:</strong> Consider the colored map at page top. \
      NASA Goddard produced the graphic to depict CO2 concentration around the globe. \
      That is to say, this data is vital to the survival of humanity. \
      Now, based on the graphic, where are the highest concentrations of CO2? \
      Viewers frequently say &ldquo;in the red.&rdquo; Red indeed looks right, but it's quite wrong. \
    </p>\
    <p>\
      As the legend below indicates, the faint violet areas actually indicate the highest CO2 concentration.\
      <img name='scale' width='50%' src='./img/color-scale.jpg' style='opacity:0.05;' onclick='event.target.style.opacity=1'>\
      <small class='caption'>Tap to show legend</small>\
    </p>\
  <h2>Use these color schemes instead</h2>\
  <p>\
    Color schemes based on <a href= 'http://en.wikipedia.org/wiki/Opponent_process'>opponent color scales</a>, ligthness (fixed hue), saturation (fixed hue), or grayscale are perceptual and more faithfully represent continuous numerical data. \
    Color space matters, too. The <a href='http://bl.ocks.org/mbostock/3014589'>Lab and HCL Color Spaces</a> are more perceptually uniform than RGB. \
  </p>\
  <h3>Opponent colors</h3>\
  <p>\
    <img name='scale' width='50%' src='./img/red-green.png'>\
    <small class='caption'>Red-green color sequence</small>\
  <p>\
  <p>\
    <img name='scale' width='50%' src='./img/blue-yellow.png'>\
    <small class='caption'>Blue-yellow color sequence (superior to red-green since its luminance increases montonically)</small>\
  <p>\
  <h3>Saturation</h3>\
  <p>\
    <img name='scale' width='50%' src='./img/red-lightness.png'>\
    <small class='caption'>Saturation encoding (red to white)</small>\
  <p>\
  <h3>Lightness</h3>\
  <p>\
    <img name='scale' width='50%' src='./img/red-darkness.png'>\
    <small class='caption'>Lightness encoding (red to black)</small>\
  <p>\
  <h3>Grayscale</h3>\
  <p>\
    <img name='scale' width='50%' src='./img/luminance.png'>\
  <p>\
  </p>\
  <h2>Save the world from bad data</h2>\
  <ul>\
    <li>Do new visualizations right</li>\
    <li>Help others by tweeting to <a href='https://twitter.com/share?url=http://rainbow.colormisuse.org&hashtags=endrainbow&via=colormisuse&text=Rainbow%20color%20schemes%20considered%20harmful%20in%20data%20visualization'>@colormisuse #endrainbow</a></li>\
    <li>Follow <a href='https://twitter.com/colormisuse'>@colormisuse</a></li>\
  </ul>\
  </p>\
  <h2>References</h2>\
  <ul>\
    <li><a href='https://eagereyes.org/basics/rainbow-color-map'>How the Rainbow Color Map Misleads</a> by Robert Kosara</li>\
    <li><a href='http://www.climate-lab-book.ac.uk/2014/end-of-the-rainbow/'>The End of the Rainbow</a> by Ed Hawkins</li>\
    <li><a href='http://www.poynter.org/uncategorized/224413/why-rainbow-colors-arent-always-the-best-options-for-data-visualizations/'>Why rainbow colors aren’t the best option for data visualizations</a> by Anna Li</li>\
    <li><a href='http://bl.ocks.org/mbostock/3014589'>Lab and HCL Color Spaces</a> by Mike Bostock</a></li>\
    <li><a href='http://www.amazon.com/Visual-Thinking-Kaufmann-Interactive-Technologies/dp/0123708966'>Visual Thinking for Design</a> by Colin Ware</li>\
    <li><a href='http://www.amazon.com/Information-Visualization-Second-Interactive-Technologies/dp/1558608192/'>Information Visualization, Second Edition: Perception for Design</a> by Colin Ware</li>\
  </ul>\
  <a href='http://rainbow.colormisuse.org'><img src='./img/badrainbow.png'></a>\
  ",
  properties: {
      backgroundColor: content.bg,
      color: content.color,
      padding: '0 1em 1em 1em',
      textAlign: "left",
  }
});
body_surface.addClass('body-text');

surfaces.push(body_surface);

for(var i = 0; i < surfaces.length; i++){
  var s = surfaces[i];
  s.pipe(scrollview);
}

//HEADER (after content for higher z-order => content shouldn't hide header
layout.header.add(new Surface({
    size: [undefined, 0],
    properties: {
      backgroundColor: header.bg
    }
}));

var actions = new Surface({
  size: [135, 34],
  content: "\
    <ul class='button-group'>\
      <li><a href='https://twitter.com/share?url=http://rainbow.colormisuse.org&hashtags=endrainbow&via=colormisuse&text=Rainbow%20color%20schemes%20considered%20harmful%20in%20data%20visualization' class='button primary big pill'>share</a></li>\
      <li><a href='https://twitter.com/colormisuse' class='button big pill'>follow</a></li>\
    </ul>",
  properties: {
  }
});

var bird = new ImageSurface({
  size: [32, 26],
  content: './img/twitter.png',
});


var footer_elts = [bird, actions];
var footer_seq = []
for(var i = 0; i < footer_elts.length; i++){
  var size = footer_elts[i].getSize();
  var width = i === 0 ? size[0] : Math.round(1.1*size[0]);
  var cs = new ContainerSurface({
    size: [width, 42],
    properties: {
    }
  });
  cs.add(center_mod).add(footer_elts[i]);
  footer_seq.push(cs);
}

var footer_row = new SequentialLayout({direction:0});
footer_row.sequenceFrom(footer_seq);

var footer_complete = new ContainerSurface({
  size: [undefined, 44],
  properties: {
    backgroundColor: 'rgba(0, 16, 32, 0.8)'
  }
});

node = footer_complete.add(center_mod).add(footer_row);

layout.footer.add(footer_complete);
mainContext.add(layout);
