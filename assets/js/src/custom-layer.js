const CustomLayers = L.Control.Layers.extend(
  {
    _initLayout() {
      const className = 'pf-control-layers',
        container = this._container = L.DomUtil.create('div', className),
        collapsed = this.options.collapsed;

      // makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
      container.setAttribute('aria-haspopup', true);

      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      const section = this._section = L.DomUtil.create('section', `${className}-list`);

      if (collapsed) {
        this._map.on('clic', this.collapse, this);

        L.DomEvent.on(container, {
          pointerenter: this._expandSafely,
          pointerleave: this.collapse
        }, this);
      }

      this._baseLayersList = L.DomUtil.create('div', `${className}-base`, section);
      this._separator = L.DomUtil.create('div', `${className}-separator`, section);
      this._overlaysList = L.DomUtil.create('div', `${className}-overlays`, section);


      container.appendChild(section);
    },

    _addItem(obj) {
      const label = document.createElement('label');
      checked = this._map.hasLayer(obj.layer);
      let input;

      label.className = 'pf-control-layers-checkbox-container'


      if (obj.overlay) {
        input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'pf-control-layers-checkbox';
        input.defaultChecked = checked;
      } else {
        // Not really considered to happen in our map.
        input = this._createRadioElement(`leaflet-base-layers_${Util.stamp(this)}`, checked);
      }

      this._layerControlInputs.push(input);
      input.layerId = L.Util.stamp(obj.layer);

      L.DomEvent.on(input, 'click', this._onInputClick, this);

      const name = document.createElement('span');
      name.className = 'pf-control-layers-checkmark';
      name.innerHTML = ` ${obj.name}`;

      switch (obj.name) {
        case 'Ciencias Naturales y de la Salud':
          label.style.borderLeftColor = '#43B02A';
          name.style.backgroundColor = '#43B02A';
          break;
        case 'Ciencias Sociales y Humanidades':
          label.style.borderLeftColor = '#d60078';
          name.style.backgroundColor = '#d60078';
          break;
        case 'Economico Administrativo':
          label.style.borderLeftColor = '#FDDA24';
          name.style.backgroundColor = '#FDDA24';
          break;
        case 'Ingeniería y Ciencias Exactas':
          label.style.borderLeftColor = '#FF671F';
          name.style.backgroundColor = '#FF671F';
          break;
        case 'Institutos':
          label.style.borderLeftColor = '#c2bfb8';
          name.style.backgroundColor = '#c2bfb8';
          break;
      }
 
      label.appendChild(input);
      label.appendChild(name);

      const container = obj.overlay ? this._overlaysList : this._baseLayersList;
      container.appendChild(label);

      this._checkDisabledLayers();
      return label;
    },

    _expandSafely() {
      const section = this._section;
      this._preventClick = true;

      L.DomEvent.on(section, 'click', L.DomEvent.preventDefault);

      this.expand();

      setTimeout(() => {
        L.DomEvent.off(section, 'click', L.DomEvent.preventDefault);
        this._preventClick = false;
      });
    }
  }
);

const customLayers = function(baseLayers, overlays, options) {
  return new CustomLayers(baseLayers, overlays, options);
}

customLayers(null, overlays).addTo(map);