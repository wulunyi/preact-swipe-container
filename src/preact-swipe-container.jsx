/**
 * @description preact-scroll-container
 */

import {h, Component} from 'preact';

// 滚动速度基准值
const SPEED = 1000;

export default class SwipeContainer extends Component {
	constructor(props) {
		super(props);

		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove  = this.handleTouchMove.bind(this);
		this.handleTouchEnd   = this.handleTouchEnd.bind(this);

		// x 标记
		this.startX = 0; // 点击时 x 位置
		this.endX   = 0; // x 结束位置
		this.diffX  = 0; // x 变化量

		// 时间标记
		this.startTimer = 0;// 记录刚开始点击的时候
		this.endTimer   = 0;// 结束时间
		this.diffTimer  = 0;// 时间变化量

		// 是否开启到边界回弹效果
		this.soft = this.props.soft || false;

		// 是否能移动
		this.moving = true;

		// 容器元素
		this.DOM = null;

		// 当前显示多少页码 从0开始
		this.currentPage = +this.props.currentPage || 0;
		this.totalPage   = +this.props.totalPage   || 0;

		this.currentTransform = this.currentPage * document.body.clientWidth * (-1); // 当前偏移量
	}

	componentDidMount(){
		this.updateTransform();
	}

	/**
	 * @description 更新定位
	 */
	updateTransform(){
		// 第一个元素为滚动元素
		let dom = this.DOM.children[0];

		this.setTransition(dom, 0)
				.setTransform(dom, this.currentTransform);
	}

	componentWillReceiveProps(props){
		let {currentPage, totalPage} = props;
		let isChange = false;

		if(currentPage != this.props.currentPage){
			isChange = true;

			this.currentPage = currentPage;
			this.currentTransform = this.currentPage * document.body.clientWidth * (-1); // 当前偏移量
		}

		if(totalPage != this.props.totalPage){
			isChange = true;

			this.totalPage = totalPage;
		}

		if(isChange){
			this.updateTransform();
		}
	}

	handleTouchStart(ev) {
		let dom = ev.currentTarget.children[0];

		this.startX = ev.changedTouches[0].pageX;
		this.diffX  = 0;

		this.startTimer = Date.now();
		this.diffTimer  = 0;

		// 关闭 动画效果
		this.setTransition(dom, 0);
	}

	handleTouchMove(ev) {
		// 认定容器第一个元素为滚动元素
		let dom = ev.currentTarget.children[0];

		this.endX  = ev.changedTouches[0].pageX;
		this.diffX = this.endX - this.startX;

		// 当处于第一页往右滑动或者最后一页往左滑动时
		if ((this.currentPage == 0 && this.diffX > 0) || (this.currentPage == this.totalPage - 1 && this.diffX < 0)) {
			this.diffX = this.diffX / 2;
			// 不可移动
			this.moving = false;
		}else {
			// 标记可移动
			this.moving = true;
			// 阻止冒泡
			ev.stopPropagation();
		}

		// 如果能移动 或则 允许弹性效果
		if(this.moving || this.soft){
			this.setTransform(dom, (this.diffX + this.currentTransform));
		}

		// 阻止默认行为
		ev.preventDefault();
		return false;
	}

	handleTouchEnd(ev) {
		if(this.moving){
			ev.stopPropagation();
		}

		if(this.moving || this.soft){
			let dom = ev.currentTarget.children[0];
			let halfScreen = document.body.clientWidth / 2;

			this.endX  = ev.changedTouches[0].pageX;
			this.diffX = this.endX - this.startX;

			this.endTimer  = Date.now();
			this.diffTimer = this.endTimer - this.startTimer;


			// 偏移量大于10才进行切换
			if (Math.abs(this.diffX) > 10) {
				if (this.diffTimer > 5000) {
					if (this.diffX < (-1) * halfScreen) {
						this.currentPage = (this.currentPage - 1) < 0 ? 0 : this.currentPage -1;
					} else if (this.diffX > halfScreen) {
						this.currentPage = (this.currentPage + 1) >= this.totalPage ? this.totalPage - 1 : this.currentPage + 1;
					}
				} else {
					if (this.diffX / this.diffTimer > 0.1) {
						this.currentPage = (this.currentPage - 1) < 0 ? 0 : this.currentPage -1;
					} else if (this.diffX / this.diffTimer < -0.1) {
						this.currentPage = (this.currentPage + 1) >= this.totalPage ? this.totalPage - 1 : this.currentPage + 1;
					}
				}

				this.slider(this.currentPage, this.diffX / this.diffTimer, dom);
			}
		}
	}

	slider(num, diff, dom) {
		// 速度计算
		let tempSpeed = Math.abs(Math.abs(parseInt(SPEED * diff)) - .5);

		tempSpeed = tempSpeed > 300 ? 300 : tempSpeed;

		// 位置计算
		let finalX = num * document.body.clientWidth * (-1);

		if(finalX !== this.currentTransform){
			this.props.onChange && this.props.onChange(this.currentPage);
		}


		this.setTransition(dom, tempSpeed)// 滚动动画控制
				.setTransform(dom, finalX);   // 滚动偏移量控制

		// 缓存偏移
		this.currentTransform = finalX;
	}

	setTransition(dom, speed){
		dom.style.webkitTransition = "-webkit-transform " + speed + "ms ease-in";
		dom.style.transition = "transform " + speed + "ms ease-in";

		return this;
	}

	setTransform(dom, distance){
		dom.style.webkitTransform = "translate3D(" + distance + "px,0,0)";
		dom.style.transform = "translate3D(" + distance + "px,0,0)";

		return this;
	}

	render({children, ...props}, state) {
		return (
				<div {...props}
						 onTouchStart={this.handleTouchStart}
						 onTouchMove={this.handleTouchMove}
						 onTouchEnd={this.handleTouchEnd}
						 ref={(ref)=>{
							 this.DOM = ref;
						 }}>

					{children}

				</div>
		);
	}
}