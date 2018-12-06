let childMixin = {
	data: function() {
		return {
			popupShowState: {
				top: false,
				middle: false,
				bottom: false
			},
			popupShowMask: false,
			activePop: 'middle'
		}
	},
	onBackPress: function() {
		if (this.popupShowMask) {
			this.popupShowMask = false
			this.hide()
			return true
		}
	},
	methods: {
		popupShow: function(evt) {
			var pos = evt;
			console.log(pos)
			switch (pos) {
				case 'top':
					this.activePop = 'top'
					break
				case 'bottom':
					this.activePop = 'bottom'
					break
				default:
					this.activePop = 'middle'
			}
			this.popupShowMask = true
			this.popupShowState[this.activePop] = true
		},
		popupHide: function() {
			this.popupShowMask = false
			this.popupShowState[this.activePop] = false
		}
	}
}
export {
	childMixin
}
