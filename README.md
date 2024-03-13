# DiscreteFourierTransform
Draw something. Then it runs the discrete fourier transform on the points and creates spinning arrows that drawout the image.

## How it works
Takes in the points drawn and converts them to points on the complex plane. then it feeds them into the discrete fourier transorm which is effectively the sum of lots of complex exponents.
The magnitude,phase and frequency can be determined from this complex output

## Discrete Fourier Transform Algorithm
The Discrete Fourier Transform(or DFT) involves taking a series of complex inputs and converting them into sums of sine and cosine waves using Eulers Identity (e^ix = Cos(x)+iSin(x) ). The DFT takes groups of equally spaced samples of amplitudes at points in time and converts them into the sum of these waves. The transformed numbers encode the frequency of phase(The "shift" of the wave),it's frequencey and amplitude.With each extra data point you need an extra arrow of the next frequency. 
After having run the DFT on the inputs (using the Y axis as the complex axis and the X as the real axis) you are left with and array of complex numbers encoding the information for each frequency(this is why it is discrete) of the wave up to N. The more prevalent a frequency the greater its magnitude.



## Other uses of the DFT
DFT is prevalent in sound and signal analysis from being able to break a complicated frequency into sets of frequencies that make it up. It can be used to remove an unwanted frequency from a sound or signal. 


## Where does the DFT come from
The discrete fourier transform is an application of fourier analysis which involves re-wrtiting a wave or function as an infinite sum of sine waves of every frequency. This is used in solving differential equations such as the heat equation to model how temperature changes accross an area.



