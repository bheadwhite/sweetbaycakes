import React from "react"
import "./CakeOrderForm.css"

const Form = () => (
	<div className='cakeOrderForm'>
		<form>
			<p className='title'>What can we make for you?</p>
			<div className='makeWhat'>
				<div>
					<p>Cake</p>
					<p>Cupcakes</p>
				</div>
				<div className='checkCol'>
					<p>
						<input type='checkbox' />
					</p>
					<p>
						<input type='checkbox' />
					</p>
				</div>
				<div>
					<p>Parfait</p>
					<p>Cookies</p>
				</div>
				<div className='checkCol'>
					<p>
						<input type='checkbox' />
					</p>
					<p>
						<input type='checkbox' />
					</p>
				</div>
			</div>
			<p>
				Cake size:
				<select id='cakeSize' onChange={e => this.setState({ cstCakeSize: e.target.value })}>
					<option>Choose...</option>
					<option value='4'>4 inches</option>
					<option value='6'>6 inches</option>
					<option value='8'>8 inches</option>
					<option value='10'>10 inches</option>
					<option value='12'>12 inches</option>
					<option value='14'>14 inches</option>
				</select>
			</p>
			<p>
				Orientation:
				<select id='cakeOrienetation' onChange={e => this.setState({ cstOrientation: e.target.value })}>
					<option>Choose...</option>
					<option value='Round'>Round</option>
					<option value='Square'>Square </option>
					<option value='Sculpted'>Sculpted </option>
				</select>
			</p>
			<p>
				Flavor of Cake:
				<select id='cakeFlavor' onChange={e => this.setState({ cstFlavor: e.target.value })}>
					<option>Choose...</option>
					<option value='Chocolate'>Chocolate</option>
					<option value='White'>White</option>
					<option value='Strawberry'>Strawberry</option>
					<option value='Yellow'>Yellow</option>
					<option value='Funfetti'>Funfetti</option>
					<option value='Red Velvet'>Red Velvet</option>
					<option value='Almond'>Almond</option>
					<option value='Lemon'>Lemon</option>
					<option value='Cherry'>Cherry</option>
				</select>
			</p>
			<p>
				Buttercream / Icing Flavors:
				<select id='creamFlavor' onChange={e => this.setState({ cstCream: e.target.value })}>
					<option>Choose...</option>
					<option value='Chocolate'>Chocolate</option>
					<option value='Vanilla'>Vanilla</option>
					<option value='Almond'>Almond</option>
					<option value='Lemon'>Lemon</option>
					<option value='Cream Cheese'>Cream Cheese</option>
					<option value='Caramel'>Caramel</option>
					<option value='Strawberry'>Strawberry</option>
					<option value='Cookies &amp; Cream'>Cookies &amp; Cream</option>
				</select>
			</p>
			<p>
				Extra Fillings:
				<select id='cakeFillings' onChange={e => this.setState({ cstFillings: e.target.value })}>
					<option>Choose...</option>
					<option value='None'>None</option>
					<option value='Ganache'>Ganache</option>
					<option value='Jelly'>Jelly</option>
					<option value='Bavarian Cream'>Bavarian Cream</option>
				</select>
			</p>
			<div className='specialInstructions'>
				<label placeholder='for example.. Sayings on cake'>
					Additional requests:
				</label>
				<div>
				<textarea className="addRequests" rows='5' onChange={e => this.setState({ cstMessage: e.target.value })} />
				</div>
				<div>
					<label className='upload' htmlFor='cakeIdea'>
						If you have a picture of your cake.
					</label>
					<div>Upload here:</div>
					<input type='file' accept='image/png, image/jpeg' multiple onChange={e => this.setState({ cstPic: e.target.value })} />
				</div>
			</div>
		</form>
	</div>
)

export default Form
