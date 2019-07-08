import React from "react"
import "./CakeOrderForm.css"
import imageIcon from "./../../assets/image.svg"

const Form = props => (
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
						<input name='makeCake' type='checkbox' value='test' onChange={props.handleChange} />
					</p>
					<p>
						<input name='makeCupcakes' type='checkbox' onChange={props.handleChange} />
					</p>
				</div>
				<div>
					<p>Parfait</p>
					<p>Cookies</p>
				</div>
				<div className='checkCol'>
					<p>
						<input name='makeParfait' type='checkbox' onChange={props.handleChange} />
					</p>
					<p>
						<input name='makeCookies' type='checkbox' onChange={props.handleChange} />
					</p>
				</div>
			</div>
			<p className="cakeSizeP">
				Cake size:
				<select name='cakeSize' id='cakeSize' onChange={props.handleChange}>
					<option>Choose...</option>
					<option value='4'>4 inches</option>
					<option value='6'>6 inches</option>
					<option value='8'>8 inches</option>
					<option value='10'>10 inches</option>
					<option value='12'>12 inches</option>
					<option value='14'>14 inches</option>
				</select>
				<img className='imageIcon' src={imageIcon} alt='icon' onClick={props.toggleModel} />
			</p>
			<p>
				Orientation:
				<select name='cakeOrientation' id='cakeOrienetation' onChange={props.handleChange}>
					<option>Choose...</option>
					<option value='Round'>Round</option>
					<option value='Square'>Square </option>
					<option value='Sculpted'>Sculpted </option>
				</select>
			</p>
			<p>
				Flavor of Cake:
				<select name='cakeFlavor' id='cakeFlavor' onChange={props.handleChange}>
					<option>Choose...</option>
					<option value='Chocolate'>Chocolate</option>
					<option value='Vanilla'>Vanilla</option>
					<option value='White'>White</option>
					<option value='Yellow'>Yellow</option>
					<option value='Funfetti'>Funfetti</option>
					<option value='Red Velvet'>Red Velvet</option>
					<option value='Strawberry'>Strawberry</option>
					<option value='Almond'>Almond</option>
					<option value='Almond Poppyseed'>Almond Poppyseed</option>
					<option value='Lemon'>Lemon</option>
					<option value='Lemon Poppyseed'>Lemon Poppyseed</option>
					<option value='spice'>spice</option>
					<option value='Blue Velvet'>Blue Velvet</option>
					<option value='Strawberry Funfetti'>Strawberry Funfetti</option>
				</select>
			</p>
			<p>
				Buttercream / Icing Flavor:
				<select name='cakeCream' id='creamFlavor' onChange={props.handleChange}>
					<option>Choose...</option>
					<option value='Chocolate'>Chocolate</option>
					<option value='Strawberry'>Strawberry</option>
					<option value='Cream Cheese'>Cream Cheese</option>
					<option value='Vanilla'>Vanilla</option>
					<option value='Almond'>Almond</option>
					<option value='Lemon'>Lemon</option>
					<option value='Cookies &amp; Cream'>Cookies &amp; Cream</option>
					<option value='Caramel'>Caramel</option>
					<option value='Peppermint'>Peppermint</option>
				</select>
			</p>
			<p>
				Extra Cost Fillings:
				<select name='cakeFillings' id='cakeFillings' onChange={props.handleChange}>
					<option value='None'>None</option>
					<option value='White Chocolate Ganache'>White Chocolate Ganache</option>
					<option value='Milk Chocolate Ganache'>Milk Chocolate Ganache</option>
					<option value='Vanilla Bavarian Cream'>Vanilla Bavarian Cream</option>
					<option value='Chocolate Bavarian Cream'>Chocolate Bavarian Cream</option>
					<option value='Key Lime'>Key Lime</option>
					<option value='Coconut'>Coconut</option>
					<option value='Jelly Strawberry'>Jelly Strawberry</option>
					<option value='Raspberry'>Raspberry</option>
					<option value='Pineapple'>Pineapple</option>
					<option value='Lemon'>Lemon</option>
					<option value='Cherry'>Cherry</option>
					<option value='Blueberry'>Blueberry</option>
					<option value='Apple'>Apple</option>
					<option value='Peach'>Peach</option>
					<option value='Fruit Raspberries'>Fruit Raspberries</option>
					<option value='Strawberries'>Strawberries</option>
					<option value='Candy Turtles'>Candy Turtles</option>
					<option value='Brownies'>Brownies</option>
					<option value='Ganache'>Ganache</option>
				</select>
			</p>
			<div className='specialInstructions'>
				<label placeholder='for example.. Sayings on cake'>Additional requests:</label>
				<div>
					<textarea name='cakeRequest' className='addRequests' rows='5' onChange={props.handleChange} placeholder="(ie. sayings: Happy Birthday John, theme for cake..)"/>
				</div>
				<div>
					<label className='upload' htmlFor='cakeIdea'>
						If you have a picture of your cake,
					</label>
					<div className='upload'>
						<span>upload here:</span>
						<input
							type='file'
							id='selectedFile'
							accept='image/png, image/jpeg'
							multiple
							onChange={props.handleFile}
							style={{ display: "none" }}
						/>
						<input
							type='button'
							value='Select File...'
							onClick={() => document.getElementById("selectedFile").click()}
							style={{ marginBottom: ".3rem", marginLeft: "5px" }}
						/>
					</div>
					<div className='thumbnails'>
						{props.pics &&
							props.pics.map((thisImage, i) => (
								<div className='thumbnail' key={i}>
									<img onClick={() => props.removeThumb(i)} src={thisImage} alt='thumbnail' />
								</div>
							))}
					</div>
				</div>
			</div>
		</form>
	</div>
)

export default Form
