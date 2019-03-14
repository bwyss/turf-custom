# Turf Custom
Use custom Turfjs with bower. Includes these modules:
  - bearing
  - buffer
  - center
  - centroid
  - circle
  - destination
  - distance
  - envelope
  - helpers
  - intersect
  - invariant
  - line-intersect
  - nearest-point
  - nearest-point-on-line
  - nearest-point-to-line
  - rewind
  - transform-rotate

## Turf Version 5.x polyfill Hack
In order to bypass the issue when turf v5.x breaks unit tests ( see https://github.com/dpmcmlxxvi/ol3-turf/issues/33 ) we a apending a polyfill hock to the begining of the turf minified javascript file.

 [From turfjs][df1]

   [df1]: <https://turfjs-builder.herokuapp.com/>