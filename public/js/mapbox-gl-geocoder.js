!(function (t) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    var e;
    (e =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this),
      (e.MapboxGeocoder = t());
  }
})(function () {
  var t;
  return (function () {
    function t(e, n, i) {
      function r(s, a) {
        if (!n[s]) {
          if (!e[s]) {
            var u = 'function' == typeof require && require;
            if (!a && u) return u(s, !0);
            if (o) return o(s, !0);
            var c = new Error("Cannot find module '" + s + "'");
            throw ((c.code = 'MODULE_NOT_FOUND'), c);
          }
          var l = (n[s] = { exports: {} });
          e[s][0].call(
            l.exports,
            function (t) {
              return r(e[s][1][t] || t);
            },
            l,
            l.exports,
            t,
            e,
            n,
            i
          );
        }
        return n[s].exports;
      }
      for (
        var o = 'function' == typeof require && require, s = 0;
        s < i.length;
        s++
      )
        r(i[s]);
      return r;
    }
    return t;
  })()(
    {
      1: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            '@babel/helpers - typeof';
            return (i =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t;
                  })(t);
          }
          function r(t) {
            (this.origin = t.origin || 'https://api.mapbox.com'),
              (this.endpoint = 'events/v2'),
              (this.access_token = t.accessToken),
              (this.version = '0.2.0'),
              (this.sessionID = this.generateSessionID()),
              (this.userAgent = this.getUserAgent()),
              (this.options = t),
              (this.send = this.send.bind(this)),
              (this.countries = t.countries ? t.countries.split(',') : null),
              (this.types = t.types ? t.types.split(',') : null),
              (this.bbox = t.bbox ? t.bbox : null),
              (this.language = t.language ? t.language.split(',') : null),
              (this.limit = t.limit ? +t.limit : null),
              (this.locale = navigator.language || null),
              (this.enableEventLogging = this.shouldEnableLogging(t)),
              (this.eventQueue = new Array()),
              (this.flushInterval = t.flushInterval || 1e3),
              (this.maxQueueSize = t.maxQueueSize || 100),
              (this.timer = this.flushInterval
                ? setTimeout(this.flush.bind(this), this.flushInterval)
                : null),
              (this.lastSentInput = ''),
              (this.lastSentIndex = 0);
          }
          var o = t('nanoid').nanoid;
          (r.prototype = {
            select: function (t, e) {
              var n = this.getSelectedIndex(t, e),
                i = this.getEventPayload('search.select', e);
              if (
                ((i.resultIndex = n),
                (i.resultPlaceName = t.place_name),
                (i.resultId = t.id),
                (n !== this.lastSentIndex ||
                  i.queryString !== this.lastSentInput) &&
                  -1 != n &&
                  ((this.lastSentIndex = n),
                  (this.lastSentInput = i.queryString),
                  i.queryString))
              )
                return this.push(i);
            },
            start: function (t) {
              var e = this.getEventPayload('search.start', t);
              if (e.queryString) return this.push(e);
            },
            keyevent: function (t, e) {
              if (
                t.key &&
                !t.metaKey &&
                -1 === [9, 27, 37, 39, 13, 38, 40].indexOf(t.keyCode)
              ) {
                var n = this.getEventPayload('search.keystroke', e);
                if (((n.lastAction = t.key), n.queryString))
                  return this.push(n);
              }
            },
            send: function (t, e) {
              if (this.enableEventLogging) {
                var n = this.getRequestOptions(t);
                this.request(
                  n,
                  function (t) {
                    return t ? this.handleError(t, e) : e ? e() : void 0;
                  }.bind(this)
                );
              } else if (e) return e();
            },
            getRequestOptions: function (t) {
              return (
                Array.isArray(t) || (t = [t]),
                {
                  method: 'POST',
                  host: this.origin,
                  path: this.endpoint + '?access_token=' + this.access_token,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(t),
                }
              );
            },
            getEventPayload: function (t, e) {
              var n;
              n = e.options.proximity
                ? 'object' === i(e.options.proximity)
                  ? [
                      e.options.proximity.longitude,
                      e.options.proximity.latitude,
                    ]
                  : 'ip' === e.options.proximity
                  ? [999, 999]
                  : e.options.proximity
                : null;
              var r = e._map ? e._map.getZoom() : void 0,
                o = {
                  event: t,
                  created: +new Date(),
                  sessionIdentifier: this.sessionID,
                  country: this.countries,
                  userAgent: this.userAgent,
                  language: this.language,
                  bbox: this.bbox,
                  types: this.types,
                  endpoint: 'mapbox.places',
                  autocomplete: e.options.autocomplete,
                  fuzzyMatch: e.options.fuzzyMatch,
                  proximity: n,
                  limit: e.options.limit,
                  routing: e.options.routing,
                  worldview: e.options.worldview,
                  mapZoom: r,
                  keyboardLocale: this.locale,
                };
              return (
                'search.select' === t
                  ? (o.queryString = e.inputString)
                  : 'search.select' != t && e._inputEl
                  ? (o.queryString = e._inputEl.value)
                  : (o.queryString = e.inputString),
                o
              );
            },
            request: function (t, e) {
              var n = new XMLHttpRequest();
              (n.onreadystatechange = function () {
                if (4 == this.readyState)
                  return e(204 == this.status ? null : this.statusText);
              }),
                n.open(t.method, t.host + '/' + t.path, !0);
              for (var i in t.headers) {
                var r = t.headers[i];
                n.setRequestHeader(i, r);
              }
              n.send(t.body);
            },
            handleError: function (t, e) {
              if (e) return e(t);
            },
            generateSessionID: function () {
              return o();
            },
            getUserAgent: function () {
              return (
                'mapbox-gl-geocoder.' + this.version + '.' + navigator.userAgent
              );
            },
            getSelectedIndex: function (t, e) {
              if (e._typeahead) {
                var n = e._typeahead.data,
                  i = t.id;
                return n
                  .map(function (t) {
                    return t.id;
                  })
                  .indexOf(i);
              }
            },
            shouldEnableLogging: function (t) {
              return (
                !1 !== t.enableEventLogging &&
                (!t.origin || -1 != t.origin.indexOf('api.mapbox.com')) &&
                !t.localGeocoder &&
                !t.filter
              );
            },
            flush: function () {
              this.eventQueue.length > 0 &&
                (this.send(this.eventQueue), (this.eventQueue = new Array())),
                this.timer && clearTimeout(this.timer),
                this.flushInterval &&
                  (this.timer = setTimeout(
                    this.flush.bind(this),
                    this.flushInterval
                  ));
            },
            push: function (t, e) {
              this.eventQueue.push(t),
                (this.eventQueue.length >= this.maxQueueSize || e) &&
                  this.flush();
            },
            remove: function () {
              this.flush();
            },
          }),
            (e.exports = r);
        },
        { nanoid: 32 },
      ],
      2: [
        function (t, e, n) {
          'use strict';
          e.exports = {
            fr: {
              name: 'France',
              bbox: [
                [-4.59235, 41.380007],
                [9.560016, 51.148506],
              ],
            },
            us: {
              name: 'United States',
              bbox: [
                [-171.791111, 18.91619],
                [-66.96466, 71.357764],
              ],
            },
            ru: {
              name: 'Russia',
              bbox: [
                [19.66064, 41.151416],
                [190.10042, 81.2504],
              ],
            },
            ca: {
              name: 'Canada',
              bbox: [
                [-140.99778, 41.675105],
                [-52.648099, 83.23324],
              ],
            },
          };
        },
        {},
      ],
      3: [
        function (t, e, n) {
          'use strict';
          function i() {}
          (i.prototype = {
            isSupport: function () {
              return Boolean(window.navigator.geolocation);
            },
            getCurrentPosition: function () {
              var t = { enableHighAccuracy: !0 };
              return new Promise(function (e, n) {
                window.navigator.geolocation.getCurrentPosition(e, n, t);
              });
            },
          }),
            (e.exports = i);
        },
        {},
      ],
      4: [
        function (t, e, n) {
          'use strict';
          function i() {
            var t = document.createElement('div');
            return (
              (t.className = 'mapboxgl-ctrl-geocoder--powered-by'),
              (t.innerHTML =
                '<a href="https://www.mapbox.com/search-service" target="_blank">Powered by Mapbox</a>'),
              t
            );
          }
          function r(t) {
            (this._eventEmitter = new u()),
              (this.options = a({}, this.options, t)),
              (this.inputString = ''),
              (this.fresh = !0),
              (this.lastSelected = null),
              (this.geolocation = new g());
          }
          var o = t('suggestions'),
            s = t('lodash.debounce'),
            a = t('xtend'),
            u = t('events').EventEmitter,
            c = t('./exceptions'),
            l = t('@mapbox/mapbox-sdk'),
            h = t('@mapbox/mapbox-sdk/services/geocoding'),
            p = t('./events'),
            f = t('./localization'),
            d = t('subtag'),
            g = t('./geolocation'),
            m = t('./utils'),
            y = { FORWARD: 0, LOCAL: 1, REVERSE: 2 };
          (r.prototype = {
            options: {
              zoom: 16,
              flyTo: !0,
              trackProximity: !0,
              minLength: 2,
              reverseGeocode: !1,
              flipCoordinates: !1,
              limit: 5,
              origin: 'https://api.mapbox.com',
              enableEventLogging: !0,
              marker: !0,
              mapboxgl: null,
              collapsed: !1,
              clearAndBlurOnEsc: !1,
              clearOnBlur: !1,
              enableGeolocation: !1,
              addressAccuracy: 'street',
              getItemValue: function (t) {
                return t.place_name;
              },
              render: function (t) {
                var e = t.place_name.split(',');
                return (
                  '<div class="mapboxgl-ctrl-geocoder--suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title">' +
                  e[0] +
                  '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address">' +
                  e.splice(1, e.length).join(',') +
                  '</div></div>'
                );
              },
            },
            addTo: function (t) {
              function e(t, e) {
                if (!document.body.contains(e))
                  throw new Error(
                    'Element provided to #addTo() exists, but is not in the DOM'
                  );
                var n = t.onAdd();
                e.appendChild(n);
              }
              if (t._controlContainer) t.addControl(this);
              else if (t instanceof HTMLElement) e(this, t);
              else {
                if ('string' != typeof t)
                  throw new Error(
                    'Error: addTo must be a mapbox-gl-js map, an html element, or a CSS selector query for a single html element'
                  );
                var n = document.querySelectorAll(t);
                if (0 === n.length)
                  throw new Error('Element ', t, 'not found.');
                if (n.length > 1)
                  throw new Error(
                    'Geocoder can only be added to a single html element'
                  );
                e(this, n[0]);
              }
            },
            onAdd: function (t) {
              if (
                (t && 'string' != typeof t && (this._map = t),
                this.setLanguage(),
                this.options.localGeocoderOnly ||
                  (this.geocoderService = h(
                    l({
                      accessToken: this.options.accessToken,
                      origin: this.options.origin,
                    })
                  )),
                this.options.localGeocoderOnly && !this.options.localGeocoder)
              )
                throw new Error(
                  'A localGeocoder function must be specified to use localGeocoderOnly mode'
                );
              (this.eventManager = new p(this.options)),
                (this._onChange = this._onChange.bind(this)),
                (this._onKeyDown = this._onKeyDown.bind(this)),
                (this._onPaste = this._onPaste.bind(this)),
                (this._onBlur = this._onBlur.bind(this)),
                (this._showButton = this._showButton.bind(this)),
                (this._hideButton = this._hideButton.bind(this)),
                (this._onQueryResult = this._onQueryResult.bind(this)),
                (this.clear = this.clear.bind(this)),
                (this._updateProximity = this._updateProximity.bind(this)),
                (this._collapse = this._collapse.bind(this)),
                (this._unCollapse = this._unCollapse.bind(this)),
                (this._clear = this._clear.bind(this)),
                (this._clearOnBlur = this._clearOnBlur.bind(this)),
                (this._geolocateUser = this._geolocateUser.bind(this));
              var e = (this.container = document.createElement('div'));
              e.className = 'mapboxgl-ctrl-geocoder mapboxgl-ctrl';
              var n = this.createIcon(
                'search',
                '<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>'
              );
              (this._inputEl = document.createElement('input')),
                (this._inputEl.type = 'text'),
                (this._inputEl.className = 'mapboxgl-ctrl-geocoder--input'),
                this.setPlaceholder(),
                this.options.collapsed &&
                  (this._collapse(),
                  this.container.addEventListener(
                    'mouseenter',
                    this._unCollapse
                  ),
                  this.container.addEventListener('mouseleave', this._collapse),
                  this._inputEl.addEventListener('focus', this._unCollapse)),
                (this.options.collapsed || this.options.clearOnBlur) &&
                  this._inputEl.addEventListener('blur', this._onBlur),
                this._inputEl.addEventListener(
                  'keydown',
                  s(this._onKeyDown, 200)
                ),
                this._inputEl.addEventListener('paste', this._onPaste),
                this._inputEl.addEventListener('change', this._onChange),
                this.container.addEventListener('mouseenter', this._showButton),
                this.container.addEventListener('mouseleave', this._hideButton),
                this._inputEl.addEventListener(
                  'keyup',
                  function (t) {
                    this.eventManager.keyevent(t, this);
                  }.bind(this)
                );
              var r = document.createElement('div');
              r.classList.add('mapboxgl-ctrl-geocoder--pin-right'),
                (this._clearEl = document.createElement('button')),
                this._clearEl.setAttribute('aria-label', 'Clear'),
                this._clearEl.addEventListener('click', this.clear),
                (this._clearEl.className = 'mapboxgl-ctrl-geocoder--button');
              var a = this.createIcon(
                'close',
                '<path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>'
              );
              if (
                (this._clearEl.appendChild(a),
                (this._loadingEl = this.createIcon(
                  'loading',
                  '<path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>'
                )),
                r.appendChild(this._clearEl),
                r.appendChild(this._loadingEl),
                e.appendChild(n),
                e.appendChild(this._inputEl),
                e.appendChild(r),
                this.options.enableGeolocation && this.geolocation.isSupport())
              ) {
                (this._geolocateEl = document.createElement('button')),
                  this._geolocateEl.setAttribute('aria-label', 'Geolocate'),
                  this._geolocateEl.addEventListener(
                    'click',
                    this._geolocateUser
                  ),
                  (this._geolocateEl.className =
                    'mapboxgl-ctrl-geocoder--button');
                var u = this.createIcon(
                  'geolocate',
                  '<path d="M12.999 3.677L2.042 8.269c-.962.403-.747 1.823.29 1.912l5.032.431.431 5.033c.089 1.037 1.509 1.252 1.912.29l4.592-10.957c.345-.822-.477-1.644-1.299-1.299z" fill="#4264fb"/>'
                );
                this._geolocateEl.appendChild(u),
                  r.appendChild(this._geolocateEl),
                  this._showGeolocateButton();
              }
              var c = (this._typeahead = new o(this._inputEl, [], {
                filter: !1,
                minLength: this.options.minLength,
                limit: this.options.limit,
              }));
              this.setRenderFunction(this.options.render),
                (c.getItemValue = this.options.getItemValue);
              var f = c.list.draw,
                d = (this._footerNode = i());
              return (
                (c.list.draw = function () {
                  f.call(this),
                    d.addEventListener(
                      'mousedown',
                      function () {
                        this.selectingListItem = !0;
                      }.bind(this)
                    ),
                    d.addEventListener(
                      'mouseup',
                      function () {
                        this.selectingListItem = !1;
                      }.bind(this)
                    ),
                    this.element.appendChild(d);
                }),
                (this.mapMarker = null),
                (this._handleMarker = this._handleMarker.bind(this)),
                this._map &&
                  (this.options.trackProximity &&
                    (this._updateProximity(),
                    this._map.on('moveend', this._updateProximity)),
                  (this._mapboxgl = this.options.mapboxgl),
                  !this._mapboxgl &&
                    this.options.marker &&
                    (console.error(
                      'No mapboxgl detected in options. Map markers are disabled. Please set options.mapboxgl.'
                    ),
                    (this.options.marker = !1))),
                e
              );
            },
            _geolocateUser: function () {
              this._hideGeolocateButton(),
                this._showLoadingIcon(),
                this.geolocation
                  .getCurrentPosition()
                  .then(
                    function (t) {
                      this._hideLoadingIcon();
                      var e = {
                        geometry: {
                          type: 'Point',
                          coordinates: [t.coords.longitude, t.coords.latitude],
                        },
                      };
                      this._handleMarker(e),
                        this._fly(e),
                        this._typeahead.clear(),
                        (this._typeahead.selected = !0),
                        (this.lastSelected = JSON.stringify(e)),
                        this._showClearButton(),
                        (this.fresh = !1);
                      var n = {
                        limit: 1,
                        language: [this.options.language],
                        query: e.geometry.coordinates,
                        types: ['address'],
                      };
                      if (this.options.localGeocoderOnly) {
                        var i =
                          e.geometry.coordinates[0] +
                          ',' +
                          e.geometry.coordinates[1];
                        this._setInputValue(i),
                          this._eventEmitter.emit('result', { result: e });
                      } else
                        this.geocoderService
                          .reverseGeocode(n)
                          .send()
                          .then(
                            function (t) {
                              var n = t.body.features[0];
                              if (n) {
                                var i = m.transformFeatureToGeolocationText(
                                  n,
                                  this.options.addressAccuracy
                                );
                                this._setInputValue(i),
                                  (n.user_coordinates = e.geometry.coordinates),
                                  this._eventEmitter.emit('result', {
                                    result: n,
                                  });
                              } else
                                this._eventEmitter.emit('result', {
                                  result: {
                                    user_coordinates: e.geometry.coordinates,
                                  },
                                });
                            }.bind(this)
                          );
                    }.bind(this)
                  )
                  .catch(
                    function (t) {
                      1 === t.code
                        ? this._renderUserDeniedGeolocationError()
                        : this._renderLocationError(),
                        this._hideLoadingIcon(),
                        this._showGeolocateButton(),
                        this._hideAttribution();
                    }.bind(this)
                  );
            },
            createIcon: function (t, e) {
              var n = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
              );
              return (
                n.setAttribute(
                  'class',
                  'mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-' +
                    t
                ),
                n.setAttribute('viewBox', '0 0 18 18'),
                n.setAttribute('xml:space', 'preserve'),
                n.setAttribute('width', 18),
                n.setAttribute('height', 18),
                (n.innerHTML = e),
                n
              );
            },
            onRemove: function () {
              return (
                this.container.parentNode.removeChild(this.container),
                this.options.trackProximity &&
                  this._map &&
                  this._map.off('moveend', this._updateProximity),
                this._removeMarker(),
                (this._map = null),
                this
              );
            },
            _setInputValue: function (t) {
              (this._inputEl.value = t),
                setTimeout(
                  function () {
                    this._inputEl.focus(),
                      (this._inputEl.scrollLeft = 0),
                      this._inputEl.setSelectionRange(0, 0);
                  }.bind(this),
                  1
                );
            },
            _onPaste: function (t) {
              var e = (t.clipboardData || window.clipboardData).getData('text');
              e.length >= this.options.minLength && this._geocode(e);
            },
            _onKeyDown: function (t) {
              if (27 === t.keyCode && this.options.clearAndBlurOnEsc)
                return this._clear(t), this._inputEl.blur();
              var e =
                t.target && t.target.shadowRoot
                  ? t.target.shadowRoot.activeElement
                  : t.target;
              if (!(e ? e.value : ''))
                return (
                  (this.fresh = !0),
                  9 !== t.keyCode && this.clear(t),
                  this._showGeolocateButton(),
                  this._hideClearButton()
                );
              this._hideGeolocateButton(),
                t.metaKey ||
                  -1 !== [9, 27, 37, 39, 13, 38, 40].indexOf(t.keyCode) ||
                  (e.value.length >= this.options.minLength &&
                    this._geocode(e.value));
            },
            _showButton: function () {
              this._typeahead.selected && this._showClearButton();
            },
            _hideButton: function () {
              this._typeahead.selected && this._hideClearButton();
            },
            _showClearButton: function () {
              this._clearEl.style.display = 'block';
            },
            _hideClearButton: function () {
              this._clearEl.style.display = 'none';
            },
            _showGeolocateButton: function () {
              this._geolocateEl &&
                this.geolocation.isSupport() &&
                (this._geolocateEl.style.display = 'block');
            },
            _hideGeolocateButton: function () {
              this._geolocateEl && (this._geolocateEl.style.display = 'none');
            },
            _showLoadingIcon: function () {
              this._loadingEl.style.display = 'block';
            },
            _hideLoadingIcon: function () {
              this._loadingEl.style.display = 'none';
            },
            _showAttribution: function () {
              this._footerNode.style.display = 'block';
            },
            _hideAttribution: function () {
              this._footerNode.style.display = 'none';
            },
            _onBlur: function (t) {
              this.options.clearOnBlur && this._clearOnBlur(t),
                this.options.collapsed && this._collapse();
            },
            _onChange: function () {
              var t = this._typeahead.selected;
              t &&
                JSON.stringify(t) !== this.lastSelected &&
                (this._hideClearButton(),
                this.options.flyTo && this._fly(t),
                this.options.marker && this._mapboxgl && this._handleMarker(t),
                this._inputEl.focus(),
                (this._inputEl.scrollLeft = 0),
                this._inputEl.setSelectionRange(0, 0),
                (this.lastSelected = JSON.stringify(t)),
                this._eventEmitter.emit('result', { result: t }),
                this.eventManager.select(t, this));
            },
            _fly: function (t) {
              var e;
              if (t.properties && c[t.properties.short_code])
                (e = a({}, this.options.flyTo)),
                  this._map &&
                    this._map.fitBounds(c[t.properties.short_code].bbox, e);
              else if (t.bbox) {
                var n = t.bbox;
                (e = a({}, this.options.flyTo)),
                  this._map &&
                    this._map.fitBounds(
                      [
                        [n[0], n[1]],
                        [n[2], n[3]],
                      ],
                      e
                    );
              } else {
                var i = { zoom: this.options.zoom };
                (e = a({}, i, this.options.flyTo)),
                  t.center
                    ? (e.center = t.center)
                    : t.geometry &&
                      t.geometry.type &&
                      'Point' === t.geometry.type &&
                      t.geometry.coordinates &&
                      (e.center = t.geometry.coordinates),
                  this._map && this._map.flyTo(e);
              }
            },
            _requestType: function (t, e) {
              var n = /^[ ]*(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/;
              return t.localGeocoderOnly
                ? y.LOCAL
                : t.reverseGeocode && n.test(e)
                ? y.REVERSE
                : y.FORWARD;
            },
            _setupConfig: function (t, e) {
              var n = [
                  'bbox',
                  'limit',
                  'proximity',
                  'countries',
                  'types',
                  'language',
                  'reverseMode',
                  'mode',
                  'autocomplete',
                  'fuzzyMatch',
                  'routing',
                  'worldview',
                ],
                i = /[\s,]+/,
                r = this,
                o = n.reduce(function (t, e) {
                  if (void 0 === r.options[e] || null === r.options[e])
                    return t;
                  ['countries', 'types', 'language'].indexOf(e) > -1
                    ? (t[e] = r.options[e].split(i))
                    : (t[e] = r.options[e]);
                  var n =
                    'number' == typeof r.options[e].longitude &&
                    'number' == typeof r.options[e].latitude;
                  if ('proximity' === e && n) {
                    var o = r.options[e].longitude,
                      s = r.options[e].latitude;
                    t[e] = [o, s];
                  }
                  return t;
                }, {});
              switch (t) {
                case y.REVERSE:
                  var s = e.split(i).map(function (t) {
                    return parseFloat(t, 10);
                  });
                  r.options.flipCoordinates || s.reverse(),
                    o.types && o.types[0],
                    (o = a(o, { query: s, limit: 1 })),
                    ['proximity', 'autocomplete', 'fuzzyMatch', 'bbox'].forEach(
                      function (t) {
                        t in o && delete o[t];
                      }
                    );
                  break;
                case y.FORWARD:
                  /^[ ]*(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)*[ ]*$/.test(e) &&
                    (e = e.replace(/,/g, ' ')),
                    (o = a(o, { query: e }));
              }
              return o;
            },
            _geocode: function (t) {
              (this.inputString = t),
                this._showLoadingIcon(),
                this._eventEmitter.emit('loading', { query: t });
              var e,
                n = this._requestType(this.options, t),
                i = this._setupConfig(n, t);
              switch (n) {
                case y.LOCAL:
                  e = Promise.resolve();
                  break;
                case y.FORWARD:
                  e = this.geocoderService.forwardGeocode(i).send();
                  break;
                case y.REVERSE:
                  e = this.geocoderService.reverseGeocode(i).send();
              }
              var r = this.options.localGeocoder
                  ? this.options.localGeocoder(t) || []
                  : [],
                o = [],
                s = null;
              return (
                e
                  .catch(
                    function (t) {
                      s = t;
                    }.bind(this)
                  )
                  .then(
                    function (e) {
                      this._hideLoadingIcon();
                      var n = {};
                      return (
                        e
                          ? '200' == e.statusCode &&
                            ((n = e.body),
                            (n.request = e.request),
                            (n.headers = e.headers))
                          : (n = { type: 'FeatureCollection', features: [] }),
                        (n.config = i),
                        this.fresh &&
                          (this.eventManager.start(this), (this.fresh = !1)),
                        (n.features = n.features ? r.concat(n.features) : r),
                        this.options.externalGeocoder
                          ? ((o =
                              this.options.externalGeocoder(t, n.features) ||
                              Promise.resolve([])),
                            o.then(
                              function (t) {
                                return (
                                  (n.features = n.features
                                    ? t.concat(n.features)
                                    : t),
                                  n
                                );
                              },
                              function () {
                                return n;
                              }
                            ))
                          : n
                      );
                    }.bind(this)
                  )
                  .then(
                    function (t) {
                      if (s) throw s;
                      this.options.filter &&
                        t.features.length &&
                        (t.features = t.features.filter(this.options.filter)),
                        t.features.length
                          ? (this._showClearButton(),
                            this._hideGeolocateButton(),
                            this._showAttribution(),
                            this._eventEmitter.emit('results', t),
                            this._typeahead.update(t.features))
                          : (this._hideClearButton(),
                            this._hideAttribution(),
                            (this._typeahead.selected = null),
                            this._renderNoResults(),
                            this._eventEmitter.emit('results', t));
                    }.bind(this)
                  )
                  .catch(
                    function (t) {
                      this._hideLoadingIcon(),
                        this._hideAttribution(),
                        (r.length && this.options.localGeocoder) ||
                        (o.length && this.options.externalGeocoder)
                          ? (this._showClearButton(),
                            this._hideGeolocateButton(),
                            this._typeahead.update(r))
                          : (this._hideClearButton(),
                            (this._typeahead.selected = null),
                            this._renderError()),
                        this._eventEmitter.emit('results', { features: r }),
                        this._eventEmitter.emit('error', { error: t });
                    }.bind(this)
                  ),
                e
              );
            },
            _clear: function (t) {
              t && t.preventDefault(),
                (this._inputEl.value = ''),
                (this._typeahead.selected = null),
                this._typeahead.clear(),
                this._onChange(),
                this._hideClearButton(),
                this._showGeolocateButton(),
                this._removeMarker(),
                (this.lastSelected = null),
                this._eventEmitter.emit('clear'),
                (this.fresh = !0);
            },
            clear: function (t) {
              this._clear(t), this._inputEl.focus();
            },
            _clearOnBlur: function (t) {
              var e = this;
              t.relatedTarget && e._clear(t);
            },
            _onQueryResult: function (t) {
              var e = t.body;
              if (e.features.length) {
                var n = e.features[0];
                (this._typeahead.selected = n),
                  (this._inputEl.value = n.place_name),
                  this._onChange();
              }
            },
            _updateProximity: function () {
              if (this._map && this.options.trackProximity)
                if (this._map.getZoom() > 9) {
                  var t = this._map.getCenter().wrap();
                  this.setProximity({ longitude: t.lng, latitude: t.lat }, !1);
                } else this.setProximity(null, !1);
            },
            _collapse: function () {
              this._inputEl.value ||
                this._inputEl === document.activeElement ||
                this.container.classList.add(
                  'mapboxgl-ctrl-geocoder--collapsed'
                );
            },
            _unCollapse: function () {
              this.container.classList.remove(
                'mapboxgl-ctrl-geocoder--collapsed'
              );
            },
            query: function (t) {
              return this._geocode(t).then(this._onQueryResult), this;
            },
            _renderError: function () {
              this._renderMessage(
                "<div class='mapbox-gl-geocoder--error'>There was an error reaching the server</div>"
              );
            },
            _renderLocationError: function () {
              this._renderMessage(
                "<div class='mapbox-gl-geocoder--error'>A location error has occurred</div>"
              );
            },
            _renderNoResults: function () {
              this._renderMessage(
                "<div class='mapbox-gl-geocoder--error mapbox-gl-geocoder--no-results'>No results found</div>"
              );
            },
            _renderUserDeniedGeolocationError: function () {
              this._renderMessage(
                "<div class='mapbox-gl-geocoder--error'>Geolocation permission denied</div>"
              );
            },
            _renderMessage: function (t) {
              this._typeahead.update([]),
                (this._typeahead.selected = null),
                this._typeahead.clear(),
                this._typeahead.renderError(t);
            },
            _getPlaceholderText: function () {
              if (this.options.placeholder) return this.options.placeholder;
              if (this.options.language) {
                var t = this.options.language.split(',')[0],
                  e = d.language(t),
                  n = f.placeholder[e];
                if (n) return n;
              }
              return 'Search';
            },
            setInput: function (t) {
              return (
                (this._inputEl.value = t),
                (this._typeahead.selected = null),
                this._typeahead.clear(),
                t.length >= this.options.minLength && this._geocode(t),
                this
              );
            },
            setProximity: function (t) {
              var e =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1];
              return (
                (this.options.proximity = t),
                e && (this.options.trackProximity = !1),
                this
              );
            },
            getProximity: function () {
              return this.options.proximity;
            },
            setRenderFunction: function (t) {
              return (
                t && 'function' == typeof t && (this._typeahead.render = t),
                this
              );
            },
            getRenderFunction: function () {
              return this._typeahead.render;
            },
            setLanguage: function (t) {
              var e =
                navigator.language ||
                navigator.userLanguage ||
                navigator.browserLanguage;
              return (
                (this.options.language = t || this.options.language || e), this
              );
            },
            getLanguage: function () {
              return this.options.language;
            },
            getZoom: function () {
              return this.options.zoom;
            },
            setZoom: function (t) {
              return (this.options.zoom = t), this;
            },
            getFlyTo: function () {
              return this.options.flyTo;
            },
            setFlyTo: function (t) {
              return (this.options.flyTo = t), this;
            },
            getPlaceholder: function () {
              return this.options.placeholder;
            },
            setPlaceholder: function (t) {
              return (
                (this.placeholder = t || this._getPlaceholderText()),
                (this._inputEl.placeholder = this.placeholder),
                this._inputEl.setAttribute('aria-label', this.placeholder),
                this
              );
            },
            getBbox: function () {
              return this.options.bbox;
            },
            setBbox: function (t) {
              return (this.options.bbox = t), this;
            },
            getCountries: function () {
              return this.options.countries;
            },
            setCountries: function (t) {
              return (this.options.countries = t), this;
            },
            getTypes: function () {
              return this.options.types;
            },
            setTypes: function (t) {
              return (this.options.types = t), this;
            },
            getMinLength: function () {
              return this.options.minLength;
            },
            setMinLength: function (t) {
              return (
                (this.options.minLength = t),
                this._typeahead && (this._typeahead.options.minLength = t),
                this
              );
            },
            getLimit: function () {
              return this.options.limit;
            },
            setLimit: function (t) {
              return (
                (this.options.limit = t),
                this._typeahead && (this._typeahead.options.limit = t),
                this
              );
            },
            getFilter: function () {
              return this.options.filter;
            },
            setFilter: function (t) {
              return (this.options.filter = t), this;
            },
            setOrigin: function (t) {
              return (
                (this.options.origin = t),
                (this.geocoderService = h(
                  l({
                    accessToken: this.options.accessToken,
                    origin: this.options.origin,
                  })
                )),
                this
              );
            },
            getOrigin: function () {
              return this.options.origin;
            },
            setAccessToken: function (t) {
              return (
                (this.options.accessToken = t),
                (this.geocoderService = h(
                  l({
                    accessToken: this.options.accessToken,
                    origin: this.options.origin,
                  })
                )),
                this
              );
            },
            setAutocomplete: function (t) {
              return (this.options.autocomplete = t), this;
            },
            getAutocomplete: function () {
              return this.options.autocomplete;
            },
            setFuzzyMatch: function (t) {
              return (this.options.fuzzyMatch = t), this;
            },
            getFuzzyMatch: function () {
              return this.options.fuzzyMatch;
            },
            setRouting: function (t) {
              return (this.options.routing = t), this;
            },
            getRouting: function () {
              return this.options.routing;
            },
            setWorldview: function (t) {
              return (this.options.worldview = t), this;
            },
            getWorldview: function () {
              return this.options.worldview;
            },
            _handleMarker: function (t) {
              if (this._map) {
                this._removeMarker();
                var e = { color: '#4668F2' },
                  n = a({}, e, this.options.marker);
                return (
                  (this.mapMarker = new this._mapboxgl.Marker(n)),
                  t.center
                    ? this.mapMarker.setLngLat(t.center).addTo(this._map)
                    : t.geometry &&
                      t.geometry.type &&
                      'Point' === t.geometry.type &&
                      t.geometry.coordinates &&
                      this.mapMarker
                        .setLngLat(t.geometry.coordinates)
                        .addTo(this._map),
                  this
                );
              }
            },
            _removeMarker: function () {
              this.mapMarker &&
                (this.mapMarker.remove(), (this.mapMarker = null));
            },
            on: function (t, e) {
              return this._eventEmitter.on(t, e), this;
            },
            off: function (t, e) {
              return (
                this._eventEmitter.removeListener(t, e),
                this.eventManager.remove(),
                this
              );
            },
          }),
            (e.exports = r);
        },
        {
          './events': 1,
          './exceptions': 2,
          './geolocation': 3,
          './localization': 5,
          './utils': 6,
          '@mapbox/mapbox-sdk': 8,
          '@mapbox/mapbox-sdk/services/geocoding': 19,
          events: 28,
          'lodash.debounce': 31,
          subtag: 35,
          suggestions: 36,
          xtend: 39,
        },
      ],
      5: [
        function (t, e, n) {
          'use strict';
          var i = {
            de: 'Suche',
            it: 'Ricerca',
            en: 'Search',
            nl: 'Zoeken',
            fr: 'Chercher',
            ca: 'Cerca',
            he: 'לחפש',
            ja: 'サーチ',
            lv: 'Meklēt',
            pt: 'Procurar',
            sr: 'Претрага',
            zh: '搜索',
            cs: 'Vyhledávání',
            hu: 'Keresés',
            ka: 'ძიება',
            nb: 'Søke',
            sk: 'Vyhľadávanie',
            th: 'ค้นหา',
            fi: 'Hae',
            is: 'Leita',
            ko: '수색',
            pl: 'Szukaj',
            sl: 'Iskanje',
            fa: 'جستجو',
            ru: 'Поиск',
          };
          e.exports = { placeholder: i };
        },
        {},
      ],
      6: [
        function (t, e, n) {
          'use strict';
          function i(t, e) {
            var n,
              i = r(t),
              o = ['address', 'street', 'place', 'country'];
            if ('function' == typeof e) return e(i);
            var s = o.indexOf(e);
            return (
              (n = -1 === s ? o : o.slice(s)),
              n.reduce(function (t, e) {
                return i[e] ? ('' !== t && (t += ', '), t + i[e]) : t;
              }, '')
            );
          }
          function r(t) {
            var e = t.address || '',
              n = t.text || '',
              i = t.place_name || '',
              r = i.split(',')[0],
              o = { address: r, houseNumber: e, street: n, placeName: i };
            return (
              t.context.forEach(function (t) {
                var e = t.id.split('.')[0];
                o[e] = t.text;
              }),
              o
            );
          }
          e.exports = {
            transformFeatureToGeolocationText: i,
            getAddressInfo: r,
          };
        },
        {},
      ],
      7: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            var e = Array.isArray(t),
              n = function (n) {
                return e ? t[n] : t;
              };
            return function (i) {
              var o = r(g.plainArray, i);
              if (o) return o;
              if (e && i.length !== t.length)
                return 'an array with ' + t.length + ' items';
              for (var s = 0; s < i.length; s++)
                if ((o = r(n(s), i[s]))) return [s].concat(o);
            };
          }
          function r(t, e) {
            if (null != e || t.hasOwnProperty('__required')) {
              var n = t(e);
              return n ? (Array.isArray(n) ? n : [n]) : void 0;
            }
          }
          function o(t, e) {
            var n = t.length,
              i = t[n - 1],
              r = t.slice(0, n - 1);
            return (
              0 === r.length && (r = [d]),
              (e = f(e, { path: r })),
              'function' == typeof i ? i(e) : c(e, a(i))
            );
          }
          function s(t) {
            return t.length < 2
              ? t[0]
              : 2 === t.length
              ? t.join(' or ')
              : t.slice(0, -1).join(', ') + ', or ' + t.slice(-1);
          }
          function a(t) {
            return 'must be ' + u(t) + '.';
          }
          function u(t) {
            return /^an? /.test(t)
              ? t
              : /^[aeiou]/i.test(t)
              ? 'an ' + t
              : /^[a-z]/i.test(t)
              ? 'a ' + t
              : t;
          }
          function c(t, e) {
            var n = l(t.path),
              i = t.path.join('.') + ' ' + e;
            return (n ? 'Item at position ' : '') + i;
          }
          function l(t) {
            return (
              'number' == typeof t[t.length - 1] || 'number' == typeof t[0]
            );
          }
          function h(t) {
            return Object.keys(t || {}).map(function (e) {
              return { key: e, value: t[e] };
            });
          }
          var p = t('is-plain-obj'),
            f = t('xtend'),
            d = 'value',
            g = {};
          (g.assert = function (t, e) {
            return (
              (e = e || {}),
              function (n) {
                var i = r(t, n);
                if (i) {
                  var s = o(i, e);
                  throw (e.apiName && (s = e.apiName + ': ' + s), new Error(s));
                }
              }
            );
          }),
            (g.shape = function (t) {
              var e = h(t);
              return function (t) {
                var n = r(g.plainObject, t);
                if (n) return n;
                for (var i, s, a = [], u = 0; u < e.length; u++)
                  (i = e[u].key),
                    (s = e[u].value),
                    (n = r(s, t[i])) && a.push([i].concat(n));
                return a.length < 2
                  ? a[0]
                  : function (t) {
                      a = a.map(function (e) {
                        return (
                          '- ' + e[0] + ': ' + o(e, t).split('\n').join('\n  ')
                        );
                      });
                      var e = t.path.join('.');
                      return (
                        'The following properties' +
                        (e === d ? '' : ' of ' + e) +
                        ' have invalid values:\n  ' +
                        a.join('\n  ')
                      );
                    };
              };
            }),
            (g.strictShape = function (t) {
              var e = g.shape(t);
              return function (n) {
                var i = e(n);
                if (i) return i;
                var r = Object.keys(n).reduce(function (e, n) {
                  return void 0 === t[n] && e.push(n), e;
                }, []);
                return 0 !== r.length
                  ? function () {
                      return 'The following keys are invalid: ' + r.join(', ');
                    }
                  : void 0;
              };
            }),
            (g.arrayOf = function (t) {
              return i(t);
            }),
            (g.tuple = function () {
              return i(
                Array.isArray(arguments[0])
                  ? arguments[0]
                  : Array.prototype.slice.call(arguments)
              );
            }),
            (g.required = function (t) {
              function e(e) {
                return null == e
                  ? function (t) {
                      return c(
                        t,
                        l(t.path) ? 'cannot be undefined/null.' : 'is required.'
                      );
                    }
                  : t.apply(this, arguments);
              }
              return (e.__required = !0), e;
            }),
            (g.oneOfType = function () {
              var t = Array.isArray(arguments[0])
                ? arguments[0]
                : Array.prototype.slice.call(arguments);
              return function (e) {
                var n = t
                  .map(function (t) {
                    return r(t, e);
                  })
                  .filter(Boolean);
                if (n.length === t.length)
                  return n.every(function (t) {
                    return 1 === t.length && 'string' == typeof t[0];
                  })
                    ? s(
                        n.map(function (t) {
                          return t[0];
                        })
                      )
                    : n.reduce(function (t, e) {
                        return e.length > t.length ? e : t;
                      });
              };
            }),
            (g.equal = function (t) {
              return function (e) {
                if (e !== t) return JSON.stringify(t);
              };
            }),
            (g.oneOf = function () {
              var t = Array.isArray(arguments[0])
                  ? arguments[0]
                  : Array.prototype.slice.call(arguments),
                e = t.map(function (t) {
                  return g.equal(t);
                });
              return g.oneOfType.apply(this, e);
            }),
            (g.range = function (t) {
              var e = t[0],
                n = t[1];
              return function (t) {
                if (r(g.number, t) || t < e || t > n)
                  return 'number between ' + e + ' & ' + n + ' (inclusive)';
              };
            }),
            (g.any = function () {}),
            (g.boolean = function (t) {
              if ('boolean' != typeof t) return 'boolean';
            }),
            (g.number = function (t) {
              if ('number' != typeof t) return 'number';
            }),
            (g.plainArray = function (t) {
              if (!Array.isArray(t)) return 'array';
            }),
            (g.plainObject = function (t) {
              if (!p(t)) return 'object';
            }),
            (g.string = function (t) {
              if ('string' != typeof t) return 'string';
            }),
            (g.func = function (t) {
              if ('function' != typeof t) return 'function';
            }),
            (g.validate = r),
            (g.processMessage = o),
            (e.exports = g);
        },
        { 'is-plain-obj': 30, xtend: 39 },
      ],
      8: [
        function (t, e, n) {
          'use strict';
          var i = t('./lib/client');
          e.exports = i;
        },
        { './lib/client': 9 },
      ],
      9: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            s.call(this, t);
          }
          function r(t) {
            return new i(t);
          }
          var o = t('./browser-layer'),
            s = t('../classes/mapi-client');
          (i.prototype = Object.create(s.prototype)),
            (i.prototype.constructor = i),
            (i.prototype.sendRequest = o.browserSend),
            (i.prototype.abortRequest = o.browserAbort),
            (e.exports = r);
        },
        { '../classes/mapi-client': 11, './browser-layer': 10 },
      ],
      10: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            var e = f[t.id];
            e && (e.abort(), delete f[t.id]);
          }
          function r(t, e) {
            return new c(t, {
              body: e.response,
              headers: p(e.getAllResponseHeaders()),
              statusCode: e.status,
            });
          }
          function o(t) {
            var e = t.total,
              n = t.loaded;
            return { total: e, transferred: n, percent: (100 * n) / e };
          }
          function s(t, e) {
            return new Promise(function (n, i) {
              e.onprogress = function (e) {
                t.emitter.emit(h.EVENT_PROGRESS_DOWNLOAD, o(e));
              };
              var r = t.file;
              r &&
                (e.upload.onprogress = function (e) {
                  t.emitter.emit(h.EVENT_PROGRESS_UPLOAD, o(e));
                }),
                (e.onerror = function (t) {
                  i(t);
                }),
                (e.onabort = function () {
                  var e = new l({ request: t, type: h.ERROR_REQUEST_ABORTED });
                  i(e);
                }),
                (e.onload = function () {
                  if ((delete f[t.id], e.status < 200 || e.status >= 400)) {
                    var r = new l({
                      request: t,
                      body: e.response,
                      statusCode: e.status,
                    });
                    return void i(r);
                  }
                  n(e);
                });
              var s = t.body;
              'string' == typeof s
                ? e.send(s)
                : s
                ? e.send(JSON.stringify(s))
                : r
                ? e.send(r)
                : e.send(),
                (f[t.id] = e);
            }).then(function (e) {
              return r(t, e);
            });
          }
          function a(t, e) {
            var n = t.url(e),
              i = new window.XMLHttpRequest();
            return (
              i.open(t.method, n),
              Object.keys(t.headers).forEach(function (e) {
                i.setRequestHeader(e, t.headers[e]);
              }),
              i
            );
          }
          function u(t) {
            return Promise.resolve().then(function () {
              var e = a(t, t.client.accessToken);
              return s(t, e);
            });
          }
          var c = t('../classes/mapi-response'),
            l = t('../classes/mapi-error'),
            h = t('../constants'),
            p = t('../helpers/parse-headers'),
            f = {};
          e.exports = {
            browserAbort: i,
            sendRequestXhr: s,
            browserSend: u,
            createRequestXhr: a,
          };
        },
        {
          '../classes/mapi-error': 12,
          '../classes/mapi-response': 14,
          '../constants': 15,
          '../helpers/parse-headers': 16,
        },
      ],
      11: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            if (!t || !t.accessToken)
              throw new Error('Cannot create a client without an access token');
            r(t.accessToken),
              (this.accessToken = t.accessToken),
              (this.origin = t.origin || s.API_ORIGIN);
          }
          var r = t('@mapbox/parse-mapbox-token'),
            o = t('./mapi-request'),
            s = t('../constants');
          (i.prototype.createRequest = function (t) {
            return new o(this, t);
          }),
            (e.exports = i);
        },
        {
          '../constants': 15,
          './mapi-request': 13,
          '@mapbox/parse-mapbox-token': 25,
        },
      ],
      12: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            var e,
              n = t.type || r.ERROR_HTTP;
            if (t.body)
              try {
                e = JSON.parse(t.body);
              } catch (n) {
                e = t.body;
              }
            else e = null;
            var i = t.message || null;
            i ||
              ('string' == typeof e
                ? (i = e)
                : e && 'string' == typeof e.message
                ? (i = e.message)
                : n === r.ERROR_REQUEST_ABORTED && (i = 'Request aborted')),
              (this.message = i),
              (this.type = n),
              (this.statusCode = t.statusCode || null),
              (this.request = t.request),
              (this.body = e);
          }
          var r = t('../constants');
          e.exports = i;
        },
        { '../constants': 15 },
      ],
      13: [
        function (t, e, n) {
          'use strict';
          function i(t, e) {
            if (!t) throw new Error('MapiRequest requires a client');
            if (!e || !e.path || !e.method)
              throw new Error(
                'MapiRequest requires an options object with path and method properties'
              );
            var n = {};
            e.body && (n['content-type'] = 'application/json');
            var i = o(n, e.headers),
              r = Object.keys(i).reduce(function (t, e) {
                return (t[e.toLowerCase()] = i[e]), t;
              }, {});
            (this.id = c++),
              (this._options = e),
              (this.emitter = new s()),
              (this.client = t),
              (this.response = null),
              (this.error = null),
              (this.sent = !1),
              (this.aborted = !1),
              (this.path = e.path),
              (this.method = e.method),
              (this.origin = e.origin || t.origin),
              (this.query = e.query || {}),
              (this.params = e.params || {}),
              (this.body = e.body || null),
              (this.file = e.file || null),
              (this.encoding = e.encoding || 'utf8'),
              (this.sendFileAs = e.sendFileAs || null),
              (this.headers = r);
          }
          var r = t('@mapbox/parse-mapbox-token'),
            o = t('xtend'),
            s = t('eventemitter3'),
            a = t('../helpers/url-utils'),
            u = t('../constants'),
            c = 1;
          (i.prototype.url = function (t) {
            var e = a.prependOrigin(this.path, this.origin);
            e = a.appendQueryObject(e, this.query);
            var n = this.params,
              i = null == t ? this.client.accessToken : t;
            if (i) {
              e = a.appendQueryParam(e, 'access_token', i);
              var s = r(i).user;
              n = o({ ownerId: s }, n);
            }
            return (e = a.interpolateRouteParams(e, n)), e;
          }),
            (i.prototype.send = function () {
              var t = this;
              if (t.sent)
                throw new Error(
                  'This request has already been sent. Check the response and error properties. Create a new request with clone().'
                );
              return (
                (t.sent = !0),
                t.client.sendRequest(t).then(
                  function (e) {
                    return (
                      (t.response = e), t.emitter.emit(u.EVENT_RESPONSE, e), e
                    );
                  },
                  function (e) {
                    throw ((t.error = e), t.emitter.emit(u.EVENT_ERROR, e), e);
                  }
                )
              );
            }),
            (i.prototype.abort = function () {
              this._nextPageRequest &&
                (this._nextPageRequest.abort(), delete this._nextPageRequest),
                this.response ||
                  this.error ||
                  this.aborted ||
                  ((this.aborted = !0), this.client.abortRequest(this));
            }),
            (i.prototype.eachPage = function (t) {
              function e(e) {
                function n() {
                  delete r._nextPageRequest;
                  var t = e.nextPage();
                  t && ((r._nextPageRequest = t), i(t));
                }
                t(null, e, n);
              }
              function n(e) {
                t(e, null, function () {});
              }
              function i(t) {
                t.send().then(e, n);
              }
              var r = this;
              i(this);
            }),
            (i.prototype.clone = function () {
              return this._extend();
            }),
            (i.prototype._extend = function (t) {
              var e = o(this._options, t);
              return new i(this.client, e);
            }),
            (e.exports = i);
        },
        {
          '../constants': 15,
          '../helpers/url-utils': 18,
          '@mapbox/parse-mapbox-token': 25,
          eventemitter3: 27,
          xtend: 39,
        },
      ],
      14: [
        function (t, e, n) {
          'use strict';
          function i(t, e) {
            (this.request = t),
              (this.headers = e.headers),
              (this.rawBody = e.body),
              (this.statusCode = e.statusCode);
            try {
              this.body = JSON.parse(e.body || '{}');
            } catch (t) {
              this.body = e.body;
            }
            this.links = r(this.headers.link);
          }
          var r = t('../helpers/parse-link-header');
          (i.prototype.hasNextPage = function () {
            return !!this.links.next;
          }),
            (i.prototype.nextPage = function () {
              return this.hasNextPage()
                ? this.request._extend({ path: this.links.next.url })
                : null;
            }),
            (e.exports = i);
        },
        { '../helpers/parse-link-header': 17 },
      ],
      15: [
        function (t, e, n) {
          'use strict';
          e.exports = {
            API_ORIGIN: 'https://api.mapbox.com',
            EVENT_PROGRESS_DOWNLOAD: 'downloadProgress',
            EVENT_PROGRESS_UPLOAD: 'uploadProgress',
            EVENT_ERROR: 'error',
            EVENT_RESPONSE: 'response',
            ERROR_HTTP: 'HttpError',
            ERROR_REQUEST_ABORTED: 'RequestAbortedError',
          };
        },
        {},
      ],
      16: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            var e = t.indexOf(':');
            return {
              name: t.substring(0, e).trim().toLowerCase(),
              value: t.substring(e + 1).trim(),
            };
          }
          function r(t) {
            var e = {};
            return t
              ? (t
                  .trim()
                  .split(/[\r|\n]+/)
                  .forEach(function (t) {
                    var n = i(t);
                    e[n.name] = n.value;
                  }),
                e)
              : e;
          }
          e.exports = r;
        },
        {},
      ],
      17: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            var e = t.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
            return e ? { key: e[1], value: e[2] } : null;
          }
          function r(t) {
            var e = t.match(/<?([^>]*)>(.*)/);
            if (!e) return null;
            var n = e[1],
              r = e[2].split(';'),
              o = null,
              s = r.reduce(function (t, e) {
                var n = i(e);
                return n
                  ? 'rel' === n.key
                    ? (o || (o = n.value), t)
                    : ((t[n.key] = n.value), t)
                  : t;
              }, {});
            return o ? { url: n, rel: o, params: s } : null;
          }
          function o(t) {
            return t
              ? t.split(/,\s*</).reduce(function (t, e) {
                  var n = r(e);
                  return n
                    ? (n.rel.split(/\s+/).forEach(function (e) {
                        t[e] || (t[e] = { url: n.url, params: n.params });
                      }),
                      t)
                    : t;
                }, {})
              : {};
          }
          e.exports = o;
        },
        {},
      ],
      18: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            return t.map(encodeURIComponent).join(',');
          }
          function r(t) {
            return Array.isArray(t) ? i(t) : encodeURIComponent(String(t));
          }
          function o(t, e, n) {
            if (!1 === n || null === n) return t;
            var i = /\?/.test(t) ? '&' : '?',
              o = encodeURIComponent(e);
            return (
              void 0 !== n && '' !== n && !0 !== n && (o += '=' + r(n)),
              '' + t + i + o
            );
          }
          function s(t, e) {
            if (!e) return t;
            var n = t;
            return (
              Object.keys(e).forEach(function (t) {
                var i = e[t];
                void 0 !== i &&
                  (Array.isArray(i) &&
                    (i = i
                      .filter(function (t) {
                        return null !== t && void 0 !== t;
                      })
                      .join(',')),
                  (n = o(n, t, i)));
              }),
              n
            );
          }
          function a(t, e) {
            if (!e) return t;
            if ('http' === t.slice(0, 4)) return t;
            var n = '/' === t[0] ? '' : '/';
            return '' + e.replace(/\/$/, '') + n + t;
          }
          function u(t, e) {
            return e
              ? t.replace(/\/:([a-zA-Z0-9]+)/g, function (t, n) {
                  var i = e[n];
                  if (void 0 === i)
                    throw new Error('Unspecified route parameter ' + n);
                  return '/' + r(i);
                })
              : t;
          }
          e.exports = {
            appendQueryObject: s,
            appendQueryParam: o,
            prependOrigin: a,
            interpolateRouteParams: u,
          };
        },
        {},
      ],
      19: [
        function (t, e, n) {
          'use strict';
          var i = t('xtend'),
            r = t('./service-helpers/validator'),
            o = t('./service-helpers/pick'),
            s = t('./service-helpers/stringify-booleans'),
            a = t('./service-helpers/create-service-factory'),
            u = {},
            c = [
              'country',
              'region',
              'postcode',
              'district',
              'place',
              'locality',
              'neighborhood',
              'address',
              'poi',
              'poi.landmark',
            ];
          (u.forwardGeocode = function (t) {
            r.assertShape({
              query: r.required(r.string),
              mode: r.oneOf('mapbox.places', 'mapbox.places-permanent'),
              countries: r.arrayOf(r.string),
              proximity: r.oneOf(r.coordinates, 'ip'),
              types: r.arrayOf(r.oneOf(c)),
              autocomplete: r.boolean,
              bbox: r.arrayOf(r.number),
              limit: r.number,
              language: r.arrayOf(r.string),
              routing: r.boolean,
              fuzzyMatch: r.boolean,
              worldview: r.string,
            })(t),
              (t.mode = t.mode || 'mapbox.places');
            var e = s(
              i(
                { country: t.countries },
                o(t, [
                  'proximity',
                  'types',
                  'autocomplete',
                  'bbox',
                  'limit',
                  'language',
                  'routing',
                  'fuzzyMatch',
                  'worldview',
                ])
              )
            );
            return this.client.createRequest({
              method: 'GET',
              path: '/geocoding/v5/:mode/:query.json',
              params: o(t, ['mode', 'query']),
              query: e,
            });
          }),
            (u.reverseGeocode = function (t) {
              r.assertShape({
                query: r.required(r.coordinates),
                mode: r.oneOf('mapbox.places', 'mapbox.places-permanent'),
                countries: r.arrayOf(r.string),
                types: r.arrayOf(r.oneOf(c)),
                bbox: r.arrayOf(r.number),
                limit: r.number,
                language: r.arrayOf(r.string),
                reverseMode: r.oneOf('distance', 'score'),
                routing: r.boolean,
                worldview: r.string,
              })(t),
                (t.mode = t.mode || 'mapbox.places');
              var e = s(
                i(
                  { country: t.countries },
                  o(t, [
                    'country',
                    'types',
                    'bbox',
                    'limit',
                    'language',
                    'reverseMode',
                    'routing',
                    'worldview',
                  ])
                )
              );
              return this.client.createRequest({
                method: 'GET',
                path: '/geocoding/v5/:mode/:query.json',
                params: o(t, ['mode', 'query']),
                query: e,
              });
            }),
            (e.exports = a(u));
        },
        {
          './service-helpers/create-service-factory': 20,
          './service-helpers/pick': 22,
          './service-helpers/stringify-booleans': 23,
          './service-helpers/validator': 24,
          xtend: 39,
        },
      ],
      20: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            return function (e) {
              var n;
              n = r.prototype.isPrototypeOf(e) ? e : o(e);
              var i = Object.create(t);
              return (i.client = n), i;
            };
          }
          var r = t('../../lib/classes/mapi-client'),
            o = t('../../lib/client');
          e.exports = i;
        },
        { '../../lib/classes/mapi-client': 11, '../../lib/client': 9 },
      ],
      21: [
        function (t, e, n) {
          'use strict';
          function i(t, e) {
            return Object.keys(t).reduce(function (n, i) {
              return (n[i] = e(i, t[i])), n;
            }, {});
          }
          e.exports = i;
        },
        {},
      ],
      22: [
        function (t, e, n) {
          'use strict';
          function i(t, e) {
            var n = function (t, n) {
              return -1 !== e.indexOf(t) && void 0 !== n;
            };
            return (
              'function' == typeof e && (n = e),
              Object.keys(t)
                .filter(function (e) {
                  return n(e, t[e]);
                })
                .reduce(function (e, n) {
                  return (e[n] = t[n]), e;
                }, {})
            );
          }
          e.exports = i;
        },
        {},
      ],
      23: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            return r(t, function (t, e) {
              return 'boolean' == typeof e ? JSON.stringify(e) : e;
            });
          }
          var r = t('./object-map');
          e.exports = i;
        },
        { './object-map': 21 },
      ],
      24: [
        function (t, e, n) {
          (function (n) {
            (function () {
              'use strict';
              function i(t) {
                if ('undefined' != typeof window) {
                  if (t instanceof n.Blob || t instanceof n.ArrayBuffer) return;
                  return 'Blob or ArrayBuffer';
                }
                if ('string' != typeof t && void 0 === t.pipe)
                  return 'Filename or Readable stream';
              }
              function r(t, e) {
                return u.assert(u.strictShape(t), e);
              }
              function o(t) {
                if ('boolean' == typeof t) return 'date';
                try {
                  var e = new Date(t);
                  if (e.getTime && isNaN(e.getTime())) return 'date';
                } catch (t) {
                  return 'date';
                }
              }
              function s(t) {
                return u.tuple(u.number, u.number)(t);
              }
              var a = t('xtend'),
                u = t('@mapbox/fusspot');
              e.exports = a(u, {
                file: i,
                date: o,
                coordinates: s,
                assertShape: r,
              });
            }.call(this));
          }.call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
              ? self
              : 'undefined' != typeof window
              ? window
              : {}
          ));
        },
        { '@mapbox/fusspot': 7, xtend: 39 },
      ],
      25: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            if (a[t]) return a[t];
            var e = t.split('.'),
              n = e[0],
              i = e[1];
            if (!i) throw new Error('Invalid token');
            var s = r(i),
              u = { usage: n, user: s.u };
            return (
              o(s, 'a') && (u.authorization = s.a),
              o(s, 'exp') && (u.expires = 1e3 * s.exp),
              o(s, 'iat') && (u.created = 1e3 * s.iat),
              o(s, 'scopes') && (u.scopes = s.scopes),
              o(s, 'client') && (u.client = s.client),
              o(s, 'll') && (u.lastLogin = s.ll),
              o(s, 'iu') && (u.impersonator = s.iu),
              (a[t] = u),
              u
            );
          }
          function r(t) {
            try {
              return JSON.parse(s.decode(t));
            } catch (t) {
              throw new Error('Invalid token');
            }
          }
          function o(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
          }
          var s = t('base-64'),
            a = {};
          e.exports = i;
        },
        { 'base-64': 26 },
      ],
      26: [
        function (e, n, i) {
          (function (e) {
            (function () {
              'use strict';
              function r(t) {
                '@babel/helpers - typeof';
                return (r =
                  'function' == typeof Symbol &&
                  'symbol' == typeof Symbol.iterator
                    ? function (t) {
                        return typeof t;
                      }
                    : function (t) {
                        return t &&
                          'function' == typeof Symbol &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t;
                      })(t);
              }
              !(function (o) {
                var s = 'object' == (void 0 === i ? 'undefined' : r(i)) && i,
                  a =
                    'object' == (void 0 === n ? 'undefined' : r(n)) &&
                    n &&
                    n.exports == s &&
                    n,
                  u = 'object' == (void 0 === e ? 'undefined' : r(e)) && e;
                (u.global !== u && u.window !== u) || (o = u);
                var c = function (t) {
                  this.message = t;
                };
                (c.prototype = new Error()),
                  (c.prototype.name = 'InvalidCharacterError');
                var l = function (t) {
                    throw new c(t);
                  },
                  h =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                  p = /[\t\n\f\r ]/g,
                  f = function (t) {
                    t = String(t).replace(p, '');
                    var e = t.length;
                    e % 4 == 0 && ((t = t.replace(/==?$/, '')), (e = t.length)),
                      (e % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(t)) &&
                        l(
                          'Invalid character: the string to be decoded is not correctly encoded.'
                        );
                    for (var n, i, r = 0, o = '', s = -1; ++s < e; )
                      (i = h.indexOf(t.charAt(s))),
                        (n = r % 4 ? 64 * n + i : i),
                        r++ % 4 &&
                          (o += String.fromCharCode(
                            255 & (n >> ((-2 * r) & 6))
                          ));
                    return o;
                  },
                  d = function (t) {
                    (t = String(t)),
                      /[^\0-\xFF]/.test(t) &&
                        l(
                          'The string to be encoded contains characters outside of the Latin1 range.'
                        );
                    for (
                      var e,
                        n,
                        i,
                        r,
                        o = t.length % 3,
                        s = '',
                        a = -1,
                        u = t.length - o;
                      ++a < u;

                    )
                      (e = t.charCodeAt(a) << 16),
                        (n = t.charCodeAt(++a) << 8),
                        (i = t.charCodeAt(++a)),
                        (r = e + n + i),
                        (s +=
                          h.charAt((r >> 18) & 63) +
                          h.charAt((r >> 12) & 63) +
                          h.charAt((r >> 6) & 63) +
                          h.charAt(63 & r));
                    return (
                      2 == o
                        ? ((e = t.charCodeAt(a) << 8),
                          (n = t.charCodeAt(++a)),
                          (r = e + n),
                          (s +=
                            h.charAt(r >> 10) +
                            h.charAt((r >> 4) & 63) +
                            h.charAt((r << 2) & 63) +
                            '='))
                        : 1 == o &&
                          ((r = t.charCodeAt(a)),
                          (s +=
                            h.charAt(r >> 2) + h.charAt((r << 4) & 63) + '==')),
                      s
                    );
                  },
                  g = { encode: d, decode: f, version: '0.1.0' };
                if ('function' == typeof t && 'object' == r(t.amd) && t.amd)
                  t(function () {
                    return g;
                  });
                else if (s && !s.nodeType)
                  if (a) a.exports = g;
                  else for (var m in g) g.hasOwnProperty(m) && (s[m] = g[m]);
                else o.base64 = g;
              })(void 0);
            }.call(this));
          }.call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
              ? self
              : 'undefined' != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      27: [
        function (t, e, n) {
          'use strict';
          function i() {}
          function r(t, e, n) {
            (this.fn = t), (this.context = e), (this.once = n || !1);
          }
          function o(t, e, n, i, o) {
            if ('function' != typeof n)
              throw new TypeError('The listener must be a function');
            var s = new r(n, i || t, o),
              a = c ? c + e : e;
            return (
              t._events[a]
                ? t._events[a].fn
                  ? (t._events[a] = [t._events[a], s])
                  : t._events[a].push(s)
                : ((t._events[a] = s), t._eventsCount++),
              t
            );
          }
          function s(t, e) {
            0 == --t._eventsCount ? (t._events = new i()) : delete t._events[e];
          }
          function a() {
            (this._events = new i()), (this._eventsCount = 0);
          }
          var u = Object.prototype.hasOwnProperty,
            c = '~';
          Object.create &&
            ((i.prototype = Object.create(null)),
            new i().__proto__ || (c = !1)),
            (a.prototype.eventNames = function () {
              var t,
                e,
                n = [];
              if (0 === this._eventsCount) return n;
              for (e in (t = this._events))
                u.call(t, e) && n.push(c ? e.slice(1) : e);
              return Object.getOwnPropertySymbols
                ? n.concat(Object.getOwnPropertySymbols(t))
                : n;
            }),
            (a.prototype.listeners = function (t) {
              var e = c ? c + t : t,
                n = this._events[e];
              if (!n) return [];
              if (n.fn) return [n.fn];
              for (var i = 0, r = n.length, o = new Array(r); i < r; i++)
                o[i] = n[i].fn;
              return o;
            }),
            (a.prototype.listenerCount = function (t) {
              var e = c ? c + t : t,
                n = this._events[e];
              return n ? (n.fn ? 1 : n.length) : 0;
            }),
            (a.prototype.emit = function (t, e, n, i, r, o) {
              var s = c ? c + t : t;
              if (!this._events[s]) return !1;
              var a,
                u,
                l = this._events[s],
                h = arguments.length;
              if (l.fn) {
                switch (
                  (l.once && this.removeListener(t, l.fn, void 0, !0), h)
                ) {
                  case 1:
                    return l.fn.call(l.context), !0;
                  case 2:
                    return l.fn.call(l.context, e), !0;
                  case 3:
                    return l.fn.call(l.context, e, n), !0;
                  case 4:
                    return l.fn.call(l.context, e, n, i), !0;
                  case 5:
                    return l.fn.call(l.context, e, n, i, r), !0;
                  case 6:
                    return l.fn.call(l.context, e, n, i, r, o), !0;
                }
                for (u = 1, a = new Array(h - 1); u < h; u++)
                  a[u - 1] = arguments[u];
                l.fn.apply(l.context, a);
              } else {
                var p,
                  f = l.length;
                for (u = 0; u < f; u++)
                  switch (
                    (l[u].once && this.removeListener(t, l[u].fn, void 0, !0),
                    h)
                  ) {
                    case 1:
                      l[u].fn.call(l[u].context);
                      break;
                    case 2:
                      l[u].fn.call(l[u].context, e);
                      break;
                    case 3:
                      l[u].fn.call(l[u].context, e, n);
                      break;
                    case 4:
                      l[u].fn.call(l[u].context, e, n, i);
                      break;
                    default:
                      if (!a)
                        for (p = 1, a = new Array(h - 1); p < h; p++)
                          a[p - 1] = arguments[p];
                      l[u].fn.apply(l[u].context, a);
                  }
              }
              return !0;
            }),
            (a.prototype.on = function (t, e, n) {
              return o(this, t, e, n, !1);
            }),
            (a.prototype.once = function (t, e, n) {
              return o(this, t, e, n, !0);
            }),
            (a.prototype.removeListener = function (t, e, n, i) {
              var r = c ? c + t : t;
              if (!this._events[r]) return this;
              if (!e) return s(this, r), this;
              var o = this._events[r];
              if (o.fn)
                o.fn !== e ||
                  (i && !o.once) ||
                  (n && o.context !== n) ||
                  s(this, r);
              else {
                for (var a = 0, u = [], l = o.length; a < l; a++)
                  (o[a].fn !== e ||
                    (i && !o[a].once) ||
                    (n && o[a].context !== n)) &&
                    u.push(o[a]);
                u.length
                  ? (this._events[r] = 1 === u.length ? u[0] : u)
                  : s(this, r);
              }
              return this;
            }),
            (a.prototype.removeAllListeners = function (t) {
              var e;
              return (
                t
                  ? ((e = c ? c + t : t), this._events[e] && s(this, e))
                  : ((this._events = new i()), (this._eventsCount = 0)),
                this
              );
            }),
            (a.prototype.off = a.prototype.removeListener),
            (a.prototype.addListener = a.prototype.on),
            (a.prefixed = c),
            (a.EventEmitter = a),
            void 0 !== e && (e.exports = a);
        },
        {},
      ],
      28: [
        function (t, e, n) {
          'use strict';
          function i(t) {
            '@babel/helpers - typeof';
            return (i =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t;
                  })(t);
          }
          function r() {
            (this._events &&
              Object.prototype.hasOwnProperty.call(this, '_events')) ||
              ((this._events = x(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }
          function o(t) {
            return void 0 === t._maxListeners
              ? r.defaultMaxListeners
              : t._maxListeners;
          }
          function s(t, e, n) {
            if (e) t.call(n);
            else
              for (var i = t.length, r = y(t, i), o = 0; o < i; ++o)
                r[o].call(n);
          }
          function a(t, e, n, i) {
            if (e) t.call(n, i);
            else
              for (var r = t.length, o = y(t, r), s = 0; s < r; ++s)
                o[s].call(n, i);
          }
          function u(t, e, n, i, r) {
            if (e) t.call(n, i, r);
            else
              for (var o = t.length, s = y(t, o), a = 0; a < o; ++a)
                s[a].call(n, i, r);
          }
          function c(t, e, n, i, r, o) {
            if (e) t.call(n, i, r, o);
            else
              for (var s = t.length, a = y(t, s), u = 0; u < s; ++u)
                a[u].call(n, i, r, o);
          }
          function l(t, e, n, i) {
            if (e) t.apply(n, i);
            else
              for (var r = t.length, o = y(t, r), s = 0; s < r; ++s)
                o[s].apply(n, i);
          }
          function h(t, e, n, r) {
            var s, a, u;
            if ('function' != typeof n)
              throw new TypeError('"listener" argument must be a function');
            if (
              ((a = t._events),
              a
                ? (a.newListener &&
                    (t.emit('newListener', e, n.listener ? n.listener : n),
                    (a = t._events)),
                  (u = a[e]))
                : ((a = t._events = x(null)), (t._eventsCount = 0)),
              u)
            ) {
              if (
                ('function' == typeof u
                  ? (u = a[e] = r ? [n, u] : [u, n])
                  : r
                  ? u.unshift(n)
                  : u.push(n),
                !u.warned && (s = o(t)) && s > 0 && u.length > s)
              ) {
                u.warned = !0;
                var c = new Error(
                  'Possible EventEmitter memory leak detected. ' +
                    u.length +
                    ' "' +
                    String(e) +
                    '" listeners added. Use emitter.setMaxListeners() to increase limit.'
                );
                (c.name = 'MaxListenersExceededWarning'),
                  (c.emitter = t),
                  (c.type = e),
                  (c.count = u.length),
                  'object' ===
                    ('undefined' == typeof console
                      ? 'undefined'
                      : i(console)) &&
                    console.warn &&
                    console.warn('%s: %s', c.name, c.message);
              }
            } else (u = a[e] = n), ++t._eventsCount;
            return t;
          }
          function p() {
            if (!this.fired)
              switch (
                (this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                arguments.length)
              ) {
                case 0:
                  return this.listener.call(this.target);
                case 1:
                  return this.listener.call(this.target, arguments[0]);
                case 2:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1]
                  );
                case 3:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1],
                    arguments[2]
                  );
                default:
                  for (
                    var t = new Array(arguments.length), e = 0;
                    e < t.length;
                    ++e
                  )
                    t[e] = arguments[e];
                  this.listener.apply(this.target, t);
              }
          }
          function f(t, e, n) {
            var i = {
                fired: !1,
                wrapFn: void 0,
                target: t,
                type: e,
                listener: n,
              },
              r = L.call(p, i);
            return (r.listener = n), (i.wrapFn = r), r;
          }
          function d(t, e, n) {
            var i = t._events;
            if (!i) return [];
            var r = i[e];
            return r
              ? 'function' == typeof r
                ? n
                  ? [r.listener || r]
                  : [r]
                : n
                ? v(r)
                : y(r, r.length)
              : [];
          }
          function g(t) {
            var e = this._events;
            if (e) {
              var n = e[t];
              if ('function' == typeof n) return 1;
              if (n) return n.length;
            }
            return 0;
          }
          function m(t, e) {
            for (var n = e, i = n + 1, r = t.length; i < r; n += 1, i += 1)
              t[n] = t[i];
            t.pop();
          }
          function y(t, e) {
            for (var n = new Array(e), i = 0; i < e; ++i) n[i] = t[i];
            return n;
          }
          function v(t) {
            for (var e = new Array(t.length), n = 0; n < e.length; ++n)
              e[n] = t[n].listener || t[n];
            return e;
          }
          function b(t) {
            var e = function () {};
            return (e.prototype = t), new e();
          }
          function _(t) {
            var e = [];
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
            return n;
          }
          function w(t) {
            var e = this;
            return function () {
              return e.apply(t, arguments);
            };
          }
          var x = Object.create || b,
            E = Object.keys || _,
            L = Function.prototype.bind || w;
          (e.exports = r),
            (r.EventEmitter = r),
            (r.prototype._events = void 0),
            (r.prototype._maxListeners = void 0);
          var O,
            k = 10;
          try {
            var A = {};
            Object.defineProperty &&
              Object.defineProperty(A, 'x', { value: 0 }),
              (O = 0 === A.x);
          } catch (t) {
            O = !1;
          }
          O
            ? Object.defineProperty(r, 'defaultMaxListeners', {
                enumerable: !0,
                get: function () {
                  return k;
                },
                set: function (t) {
                  if ('number' != typeof t || t < 0 || t !== t)
                    throw new TypeError(
                      '"defaultMaxListeners" must be a positive number'
                    );
                  k = t;
                },
              })
            : (r.defaultMaxListeners = k),
            (r.prototype.setMaxListeners = function (t) {
              if ('number' != typeof t || t < 0 || isNaN(t))
                throw new TypeError('"n" argument must be a positive number');
              return (this._maxListeners = t), this;
            }),
            (r.prototype.getMaxListeners = function () {
              return o(this);
            }),
            (r.prototype.emit = function (t) {
              var e,
                n,
                i,
                r,
                o,
                h,
                p = 'error' === t;
              if ((h = this._events)) p = p && null == h.error;
              else if (!p) return !1;
              if (p) {
                if (
                  (arguments.length > 1 && (e = arguments[1]),
                  e instanceof Error)
                )
                  throw e;
                var f = new Error('Unhandled "error" event. (' + e + ')');
                throw ((f.context = e), f);
              }
              if (!(n = h[t])) return !1;
              var d = 'function' == typeof n;
              switch ((i = arguments.length)) {
                case 1:
                  s(n, d, this);
                  break;
                case 2:
                  a(n, d, this, arguments[1]);
                  break;
                case 3:
                  u(n, d, this, arguments[1], arguments[2]);
                  break;
                case 4:
                  c(n, d, this, arguments[1], arguments[2], arguments[3]);
                  break;
                default:
                  for (r = new Array(i - 1), o = 1; o < i; o++)
                    r[o - 1] = arguments[o];
                  l(n, d, this, r);
              }
              return !0;
            }),
            (r.prototype.addListener = function (t, e) {
              return h(this, t, e, !1);
            }),
            (r.prototype.on = r.prototype.addListener),
            (r.prototype.prependListener = function (t, e) {
              return h(this, t, e, !0);
            }),
            (r.prototype.once = function (t, e) {
              if ('function' != typeof e)
                throw new TypeError('"listener" argument must be a function');
              return this.on(t, f(this, t, e)), this;
            }),
            (r.prototype.prependOnceListener = function (t, e) {
              if ('function' != typeof e)
                throw new TypeError('"listener" argument must be a function');
              return this.prependListener(t, f(this, t, e)), this;
            }),
            (r.prototype.removeListener = function (t, e) {
              var n, i, r, o, s;
              if ('function' != typeof e)
                throw new TypeError('"listener" argument must be a function');
              if (!(i = this._events)) return this;
              if (!(n = i[t])) return this;
              if (n === e || n.listener === e)
                0 == --this._eventsCount
                  ? (this._events = x(null))
                  : (delete i[t],
                    i.removeListener &&
                      this.emit('removeListener', t, n.listener || e));
              else if ('function' != typeof n) {
                for (r = -1, o = n.length - 1; o >= 0; o--)
                  if (n[o] === e || n[o].listener === e) {
                    (s = n[o].listener), (r = o);
                    break;
                  }
                if (r < 0) return this;
                0 === r ? n.shift() : m(n, r),
                  1 === n.length && (i[t] = n[0]),
                  i.removeListener && this.emit('removeListener', t, s || e);
              }
              return this;
            }),
            (r.prototype.removeAllListeners = function (t) {
              var e, n, i;
              if (!(n = this._events)) return this;
              if (!n.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = x(null)), (this._eventsCount = 0))
                    : n[t] &&
                      (0 == --this._eventsCount
                        ? (this._events = x(null))
                        : delete n[t]),
                  this
                );
              if (0 === arguments.length) {
                var r,
                  o = E(n);
                for (i = 0; i < o.length; ++i)
                  'removeListener' !== (r = o[i]) && this.removeAllListeners(r);
                return (
                  this.removeAllListeners('removeListener'),
                  (this._events = x(null)),
                  (this._eventsCount = 0),
                  this
                );
              }
              if ('function' == typeof (e = n[t])) this.removeListener(t, e);
              else if (e)
                for (i = e.length - 1; i >= 0; i--)
                  this.removeListener(t, e[i]);
              return this;
            }),
            (r.prototype.listeners = function (t) {
              return d(this, t, !0);
            }),
            (r.prototype.rawListeners = function (t) {
              return d(this, t, !1);
            }),
            (r.listenerCount = function (t, e) {
              return 'function' == typeof t.listenerCount
                ? t.listenerCount(e)
                : g.call(t, e);
            }),
            (r.prototype.listenerCount = g),
            (r.prototype.eventNames = function () {
              return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
            });
        },
        {},
      ],
      29: [
        function (t, e, n) {
          'use strict';
          !(function () {
            var t = this,
              i = {};
            void 0 !== n ? (e.exports = i) : (t.fuzzy = i),
              (i.simpleFilter = function (t, e) {
                return e.filter(function (e) {
                  return i.test(t, e);
                });
              }),
              (i.test = function (t, e) {
                return null !== i.match(t, e);
              }),
              (i.match = function (t, e, n) {
                n = n || {};
                var i,
                  r = 0,
                  o = [],
                  s = e.length,
                  a = 0,
                  u = 0,
                  c = n.pre || '',
                  l = n.post || '',
                  h = (n.caseSensitive && e) || e.toLowerCase();
                t = (n.caseSensitive && t) || t.toLowerCase();
                for (var p = 0; p < s; p++)
                  (i = e[p]),
                    h[p] === t[r]
                      ? ((i = c + i + l), (r += 1), (u += 1 + u))
                      : (u = 0),
                    (a += u),
                    (o[o.length] = i);
                return r === t.length
                  ? ((a = h === t ? 1 / 0 : a),
                    { rendered: o.join(''), score: a })
                  : null;
              }),
              (i.filter = function (t, e, n) {
                return e && 0 !== e.length
                  ? 'string' != typeof t
                    ? e
                    : ((n = n || {}),
                      e
                        .reduce(function (e, r, o, s) {
                          var a = r;
                          n.extract && (a = n.extract(r));
                          var u = i.match(t, a, n);
                          return (
                            null != u &&
                              (e[e.length] = {
                                string: u.rendered,
                                score: u.score,
                                index: o,
                                original: r,
                              }),
                            e
                          );
                        }, [])
                        .sort(function (t, e) {
                          var n = e.score - t.score;
                          return n || t.index - e.index;
                        }))
                  : [];
              });
          })();
        },
        {},
      ],
      30: [
        function (t, e, n) {
          'use strict';
          var i = Object.prototype.toString;
          e.exports = function (t) {
            var e;
            return (
              '[object Object]' === i.call(t) &&
              (null === (e = Object.getPrototypeOf(t)) ||
                e === Object.getPrototypeOf({}))
            );
          };
        },
        {},
      ],
      31: [
        function (t, e, n) {
          (function (t) {
            (function () {
              'use strict';
              function n(t) {
                '@babel/helpers - typeof';
                return (n =
                  'function' == typeof Symbol &&
                  'symbol' == typeof Symbol.iterator
                    ? function (t) {
                        return typeof t;
                      }
                    : function (t) {
                        return t &&
                          'function' == typeof Symbol &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t;
                      })(t);
              }
              function i(t, e, n) {
                function i(e) {
                  var n = g,
                    i = m;
                  return (g = m = void 0), (L = e), (v = t.apply(i, n));
                }
                function o(t) {
                  return (L = t), (b = setTimeout(l, e)), O ? i(t) : v;
                }
                function s(t) {
                  var n = t - _,
                    i = t - L,
                    r = e - n;
                  return k ? x(r, y - i) : r;
                }
                function c(t) {
                  var n = t - _,
                    i = t - L;
                  return void 0 === _ || n >= e || n < 0 || (k && i >= y);
                }
                function l() {
                  var t = E();
                  if (c(t)) return h(t);
                  b = setTimeout(l, s(t));
                }
                function h(t) {
                  return (b = void 0), A && g ? i(t) : ((g = m = void 0), v);
                }
                function p() {
                  void 0 !== b && clearTimeout(b),
                    (L = 0),
                    (g = _ = m = b = void 0);
                }
                function f() {
                  return void 0 === b ? v : h(E());
                }
                function d() {
                  var t = E(),
                    n = c(t);
                  if (((g = arguments), (m = this), (_ = t), n)) {
                    if (void 0 === b) return o(_);
                    if (k) return (b = setTimeout(l, e)), i(_);
                  }
                  return void 0 === b && (b = setTimeout(l, e)), v;
                }
                var g,
                  m,
                  y,
                  v,
                  b,
                  _,
                  L = 0,
                  O = !1,
                  k = !1,
                  A = !0;
                if ('function' != typeof t) throw new TypeError(u);
                return (
                  (e = a(e) || 0),
                  r(n) &&
                    ((O = !!n.leading),
                    (k = 'maxWait' in n),
                    (y = k ? w(a(n.maxWait) || 0, e) : y),
                    (A = 'trailing' in n ? !!n.trailing : A)),
                  (d.cancel = p),
                  (d.flush = f),
                  d
                );
              }
              function r(t) {
                var e = n(t);
                return !!t && ('object' == e || 'function' == e);
              }
              function o(t) {
                return !!t && 'object' == n(t);
              }
              function s(t) {
                return 'symbol' == n(t) || (o(t) && _.call(t) == l);
              }
              function a(t) {
                if ('number' == typeof t) return t;
                if (s(t)) return c;
                if (r(t)) {
                  var e = 'function' == typeof t.valueOf ? t.valueOf() : t;
                  t = r(e) ? e + '' : e;
                }
                if ('string' != typeof t) return 0 === t ? t : +t;
                t = t.replace(h, '');
                var n = f.test(t);
                return n || d.test(t)
                  ? g(t.slice(2), n ? 2 : 8)
                  : p.test(t)
                  ? c
                  : +t;
              }
              var u = 'Expected a function',
                c = NaN,
                l = '[object Symbol]',
                h = /^\s+|\s+$/g,
                p = /^[-+]0x[0-9a-f]+$/i,
                f = /^0b[01]+$/i,
                d = /^0o[0-7]+$/i,
                g = parseInt,
                m =
                  'object' == (void 0 === t ? 'undefined' : n(t)) &&
                  t &&
                  t.Object === Object &&
                  t,
                y =
                  'object' ==
                    ('undefined' == typeof self ? 'undefined' : n(self)) &&
                  self &&
                  self.Object === Object &&
                  self,
                v = m || y || Function('return this')(),
                b = Object.prototype,
                _ = b.toString,
                w = Math.max,
                x = Math.min,
                E = function () {
                  return v.Date.now();
                };
              e.exports = i;
            }.call(this));
          }.call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
              ? self
              : 'undefined' != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      32: [
        function (t, e, n) {
          (function (n) {
            (function () {
              'use strict';
              var i = t('./url-alphabet/index.cjs'),
                r = i.urlAlphabet;
              if ('production' !== n.env.NODE_ENV) {
                if (
                  'undefined' != typeof navigator &&
                  'ReactNative' === navigator.product &&
                  'undefined' == typeof crypto
                )
                  throw new Error(
                    'React Native does not have a built-in secure random generator. If you don’t need unpredictable IDs use `nanoid/non-secure`. For secure IDs, import `react-native-get-random-values` before Nano ID.'
                  );
                if (
                  'undefined' != typeof msCrypto &&
                  'undefined' == typeof crypto
                )
                  throw new Error(
                    'Import file with `if (!window.crypto) window.crypto = window.msCrypto` before importing Nano ID to fix IE 11 support'
                  );
                if ('undefined' == typeof crypto)
                  throw new Error(
                    'Your browser does not have secure random generator. If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
                  );
              }
              var o = function (t) {
                  return crypto.getRandomValues(new Uint8Array(t));
                },
                s = function (t, e, n) {
                  var i = (2 << (Math.log(t.length - 1) / Math.LN2)) - 1,
                    r = -~((1.6 * i * e) / t.length);
                  return function () {
                    for (var o = ''; ; )
                      for (var s = n(r), a = r; a--; )
                        if (((o += t[s[a] & i] || ''), o.length === e))
                          return o;
                  };
                },
                a = function (t, e) {
                  return s(t, e, o);
                },
                u = function () {
                  for (
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 21,
                      e = '',
                      n = crypto.getRandomValues(new Uint8Array(t));
                    t--;

                  ) {
                    var i = 63 & n[t];
                    e +=
                      i < 36
                        ? i.toString(36)
                        : i < 62
                        ? (i - 26).toString(36).toUpperCase()
                        : i < 63
                        ? '_'
                        : '-';
                  }
                  return e;
                };
              e.exports = {
                nanoid: u,
                customAlphabet: a,
                customRandom: s,
                urlAlphabet: r,
                random: o,
              };
            }.call(this));
          }.call(this, t('_process')));
        },
        { './url-alphabet/index.cjs': 33, _process: 34 },
      ],
      33: [
        function (t, e, n) {
          'use strict';
          e.exports = {
            urlAlphabet:
              'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict',
          };
        },
        {},
      ],
      34: [
        function (t, e, n) {
          'use strict';
          function i() {
            throw new Error('setTimeout has not been defined');
          }
          function r() {
            throw new Error('clearTimeout has not been defined');
          }
          function o(t) {
            if (h === setTimeout) return setTimeout(t, 0);
            if ((h === i || !h) && setTimeout)
              return (h = setTimeout), setTimeout(t, 0);
            try {
              return h(t, 0);
            } catch (e) {
              try {
                return h.call(null, t, 0);
              } catch (e) {
                return h.call(this, t, 0);
              }
            }
          }
          function s(t) {
            if (p === clearTimeout) return clearTimeout(t);
            if ((p === r || !p) && clearTimeout)
              return (p = clearTimeout), clearTimeout(t);
            try {
              return p(t);
            } catch (e) {
              try {
                return p.call(null, t);
              } catch (e) {
                return p.call(this, t);
              }
            }
          }
          function a() {
            m &&
              d &&
              ((m = !1),
              d.length ? (g = d.concat(g)) : (y = -1),
              g.length && u());
          }
          function u() {
            if (!m) {
              var t = o(a);
              m = !0;
              for (var e = g.length; e; ) {
                for (d = g, g = []; ++y < e; ) d && d[y].run();
                (y = -1), (e = g.length);
              }
              (d = null), (m = !1), s(t);
            }
          }
          function c(t, e) {
            (this.fun = t), (this.array = e);
          }
          function l() {}
          var h,
            p,
            f = (e.exports = {});
          !(function () {
            try {
              h = 'function' == typeof setTimeout ? setTimeout : i;
            } catch (t) {
              h = i;
            }
            try {
              p = 'function' == typeof clearTimeout ? clearTimeout : r;
            } catch (t) {
              p = r;
            }
          })();
          var d,
            g = [],
            m = !1,
            y = -1;
          (f.nextTick = function (t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n];
            g.push(new c(t, e)), 1 !== g.length || m || o(u);
          }),
            (c.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (f.title = 'browser'),
            (f.browser = !0),
            (f.env = {}),
            (f.argv = []),
            (f.version = ''),
            (f.versions = {}),
            (f.on = l),
            (f.addListener = l),
            (f.once = l),
            (f.off = l),
            (f.removeListener = l),
            (f.removeAllListeners = l),
            (f.emit = l),
            (f.prependListener = l),
            (f.prependOnceListener = l),
            (f.listeners = function (t) {
              return [];
            }),
            (f.binding = function (t) {
              throw new Error('process.binding is not supported');
            }),
            (f.cwd = function () {
              return '/';
            }),
            (f.chdir = function (t) {
              throw new Error('process.chdir is not supported');
            }),
            (f.umask = function () {
              return 0;
            });
        },
        {},
      ],
      35: [
        function (t, e, n) {
          'use strict';
          !(function (t, n, i) {
            void 0 !== e && e.exports ? (e.exports = i()) : (t.subtag = i());
          })(void 0, 0, function () {
            function t(t) {
              return t.match(s) || [];
            }
            function e(e) {
              return t(e).filter(function (t, e) {
                return t && e;
              });
            }
            function n(e) {
              return (
                (e = t(e)),
                {
                  language: e[1] || o,
                  extlang: e[2] || o,
                  script: e[3] || o,
                  region: e[4] || o,
                }
              );
            }
            function i(t, e, n) {
              Object.defineProperty(t, e, { value: n, enumerable: !0 });
            }
            function r(e, r, s) {
              function a(n) {
                return t(n)[e] || o;
              }
              i(a, 'pattern', r), i(n, s, a);
            }
            var o = '',
              s =
                /^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|[0-9]{3})(?=$|[_-]+))?/;
            return (
              r(1, /^[a-zA-Z]{2,3}$/, 'language'),
              r(2, /^[a-zA-Z]{3}$/, 'extlang'),
              r(3, /^[a-zA-Z]{4}$/, 'script'),
              r(4, /^[a-zA-Z]{2}$|^[0-9]{3}$/, 'region'),
              i(n, 'split', e),
              n
            );
          });
        },
        {},
      ],
      36: [
        function (t, e, n) {
          'use strict';
          var i = t('./src/suggestions');
          (e.exports = i),
            'undefined' != typeof window && (window.Suggestions = i);
        },
        { './src/suggestions': 38 },
      ],
      37: [
        function (t, e, n) {
          'use strict';
          var i = function (t) {
            return (
              (this.component = t),
              (this.items = []),
              (this.active = 0),
              (this.wrapper = document.createElement('div')),
              (this.wrapper.className = 'suggestions-wrapper'),
              (this.element = document.createElement('ul')),
              (this.element.className = 'suggestions'),
              this.wrapper.appendChild(this.element),
              (this.selectingListItem = !1),
              t.el.parentNode.insertBefore(this.wrapper, t.el.nextSibling),
              this
            );
          };
          (i.prototype.show = function () {
            this.element.style.display = 'block';
          }),
            (i.prototype.hide = function () {
              this.element.style.display = 'none';
            }),
            (i.prototype.add = function (t) {
              this.items.push(t);
            }),
            (i.prototype.clear = function () {
              (this.items = []), (this.active = 0);
            }),
            (i.prototype.isEmpty = function () {
              return !this.items.length;
            }),
            (i.prototype.isVisible = function () {
              return 'block' === this.element.style.display;
            }),
            (i.prototype.draw = function () {
              if (((this.element.innerHTML = ''), 0 === this.items.length))
                return void this.hide();
              for (var t = 0; t < this.items.length; t++)
                this.drawItem(this.items[t], this.active === t);
              this.show();
            }),
            (i.prototype.drawItem = function (t, e) {
              var n = document.createElement('li'),
                i = document.createElement('a');
              e && (n.className += ' active'),
                (i.innerHTML = t.string),
                n.appendChild(i),
                this.element.appendChild(n),
                n.addEventListener(
                  'mousedown',
                  function () {
                    this.selectingListItem = !0;
                  }.bind(this)
                ),
                n.addEventListener(
                  'mouseup',
                  function () {
                    this.handleMouseUp.call(this, t);
                  }.bind(this)
                );
            }),
            (i.prototype.handleMouseUp = function (t) {
              (this.selectingListItem = !1),
                this.component.value(t.original),
                this.clear(),
                this.draw();
            }),
            (i.prototype.move = function (t) {
              (this.active = t), this.draw();
            }),
            (i.prototype.previous = function () {
              this.move(
                0 === this.active ? this.items.length - 1 : this.active - 1
              );
            }),
            (i.prototype.next = function () {
              this.move(
                this.active === this.items.length - 1 ? 0 : this.active + 1
              );
            }),
            (i.prototype.drawError = function (t) {
              var e = document.createElement('li');
              (e.innerHTML = t), this.element.appendChild(e), this.show();
            }),
            (e.exports = i);
        },
        {},
      ],
      38: [
        function (t, e, n) {
          'use strict';
          var i = t('xtend'),
            r = t('fuzzy'),
            o = t('./list'),
            s = function (t, e, n) {
              return (
                (n = n || {}),
                (this.options = i(
                  { minLength: 2, limit: 5, filter: !0, hideOnBlur: !0 },
                  n
                )),
                (this.el = t),
                (this.data = e || []),
                (this.list = new o(this)),
                (this.query = ''),
                (this.selected = null),
                this.list.draw(),
                this.el.addEventListener(
                  'keyup',
                  function (t) {
                    this.handleKeyUp(t.keyCode);
                  }.bind(this),
                  !1
                ),
                this.el.addEventListener(
                  'keydown',
                  function (t) {
                    this.handleKeyDown(t);
                  }.bind(this)
                ),
                this.el.addEventListener(
                  'focus',
                  function () {
                    this.handleFocus();
                  }.bind(this)
                ),
                this.el.addEventListener(
                  'blur',
                  function () {
                    this.handleBlur();
                  }.bind(this)
                ),
                this.el.addEventListener(
                  'paste',
                  function (t) {
                    this.handlePaste(t);
                  }.bind(this)
                ),
                (this.render = this.options.render
                  ? this.options.render.bind(this)
                  : this.render.bind(this)),
                (this.getItemValue = this.options.getItemValue
                  ? this.options.getItemValue.bind(this)
                  : this.getItemValue.bind(this)),
                this
              );
            };
          (s.prototype.handleKeyUp = function (t) {
            40 !== t &&
              38 !== t &&
              27 !== t &&
              13 !== t &&
              9 !== t &&
              this.handleInputChange(this.el.value);
          }),
            (s.prototype.handleKeyDown = function (t) {
              switch (t.keyCode) {
                case 13:
                case 9:
                  this.list.isEmpty() ||
                    (this.list.isVisible() && t.preventDefault(),
                    this.value(this.list.items[this.list.active].original),
                    this.list.hide());
                  break;
                case 27:
                  this.list.isEmpty() || this.list.hide();
                  break;
                case 38:
                  this.list.previous();
                  break;
                case 40:
                  this.list.next();
              }
            }),
            (s.prototype.handleBlur = function () {
              !this.list.selectingListItem &&
                this.options.hideOnBlur &&
                this.list.hide();
            }),
            (s.prototype.handlePaste = function (t) {
              if (t.clipboardData)
                this.handleInputChange(t.clipboardData.getData('Text'));
              else {
                var e = this;
                setTimeout(function () {
                  e.handleInputChange(t.target.value);
                }, 100);
              }
            }),
            (s.prototype.handleInputChange = function (t) {
              if (
                ((this.query = this.normalize(t)),
                this.list.clear(),
                this.query.length < this.options.minLength)
              )
                return void this.list.draw();
              this.getCandidates(
                function (t) {
                  for (
                    var e = 0;
                    e < t.length &&
                    (this.list.add(t[e]), e !== this.options.limit - 1);
                    e++
                  );
                  this.list.draw();
                }.bind(this)
              );
            }),
            (s.prototype.handleFocus = function () {
              this.list.isEmpty() || this.list.show(),
                (this.list.selectingListItem = !1);
            }),
            (s.prototype.update = function (t) {
              (this.data = t), this.handleKeyUp();
            }),
            (s.prototype.clear = function () {
              (this.data = []), this.list.clear();
            }),
            (s.prototype.normalize = function (t) {
              return (t = t.toLowerCase());
            }),
            (s.prototype.match = function (t, e) {
              return t.indexOf(e) > -1;
            }),
            (s.prototype.value = function (t) {
              if (
                ((this.selected = t),
                (this.el.value = this.getItemValue(t)),
                document.createEvent)
              ) {
                var e = document.createEvent('HTMLEvents');
                e.initEvent('change', !0, !1), this.el.dispatchEvent(e);
              } else this.el.fireEvent('onchange');
            }),
            (s.prototype.getCandidates = function (t) {
              var e,
                n = {
                  pre: '<strong>',
                  post: '</strong>',
                  extract: function (t) {
                    return this.getItemValue(t);
                  }.bind(this),
                };
              this.options.filter
                ? ((e = r.filter(this.query, this.data, n)),
                  (e = e.map(
                    function (t) {
                      return {
                        original: t.original,
                        string: this.render(t.original, t.string),
                      };
                    }.bind(this)
                  )))
                : (e = this.data.map(
                    function (t) {
                      return { original: t, string: this.render(t) };
                    }.bind(this)
                  )),
                t(e);
            }),
            (s.prototype.getItemValue = function (t) {
              return t;
            }),
            (s.prototype.render = function (t, e) {
              if (e) return e;
              for (
                var n = t.original
                    ? this.getItemValue(t.original)
                    : this.getItemValue(t),
                  i = this.normalize(n),
                  r = i.lastIndexOf(this.query);
                r > -1;

              ) {
                var o = r + this.query.length;
                (n =
                  n.slice(0, r) +
                  '<strong>' +
                  n.slice(r, o) +
                  '</strong>' +
                  n.slice(o)),
                  (r = i.slice(0, r).lastIndexOf(this.query));
              }
              return n;
            }),
            (s.prototype.renderError = function (t) {
              this.list.drawError(t);
            }),
            (e.exports = s);
        },
        { './list': 37, fuzzy: 29, xtend: 39 },
      ],
      39: [
        function (t, e, n) {
          'use strict';
          function i() {
            for (var t = {}, e = 0; e < arguments.length; e++) {
              var n = arguments[e];
              for (var i in n) r.call(n, i) && (t[i] = n[i]);
            }
            return t;
          }
          e.exports = i;
          var r = Object.prototype.hasOwnProperty;
        },
        {},
      ],
    },
    {},
    [4]
  )(4);
});
